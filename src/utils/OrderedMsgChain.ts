import debugFactory from 'debug'
import Heap from 'heap'
import EventEmitter from 'eventemitter3'

import GapFillFailedError from '../errors/GapFillFailedError'
import MessageRef from '../protocol/message_layer/MessageRef'

import { Todo } from '../sharedTypes'

const debug = debugFactory('StreamrClient::OrderedMsgChain')
// The time it takes to propagate messages in the network. If we detect a gap, we first wait this amount of time because the missing
// messages might still be propagated.
const DEFAULT_PROPAGATION_TIMEOUT = 5000
// The round trip time it takes to request a resend and receive the answer. If the messages are still missing after the propagation
// delay, we request a resend and periodically wait this amount of time before requesting it again.
const DEFAULT_RESEND_TIMEOUT = 5000
const MAX_GAP_REQUESTS = 10

export default class OrderedMsgChain extends EventEmitter {

    static MAX_GAP_REQUESTS = MAX_GAP_REQUESTS

    markedExplicitly: Todo
    publisherId: Todo
    msgChainId: Todo
    inOrderHandler: Todo
    gapHandler: Todo
    lastReceivedMsgRef: Todo
    propagationTimeout: Todo
    resendTimeout: Todo
    queue: Todo
    inProgress: Todo
    nextGaps: Todo
    firstGap: Todo
    gapRequestCount: Todo

    constructor(
        publisherId: Todo, msgChainId: Todo, inOrderHandler: Todo, gapHandler: Todo,
        propagationTimeout = DEFAULT_PROPAGATION_TIMEOUT, resendTimeout = DEFAULT_RESEND_TIMEOUT,
    ) {
        super()
        this.markedExplicitly = new WeakSet()
        this.publisherId = publisherId
        this.msgChainId = msgChainId
        this.inOrderHandler = inOrderHandler
        this.gapHandler = gapHandler
        this.lastReceivedMsgRef = null
        this.propagationTimeout = propagationTimeout
        this.resendTimeout = resendTimeout
        /* eslint-disable arrow-body-style */
        this.queue = new Heap((msg1: Todo, msg2: Todo) => {
            return msg1.getMessageRef().compareTo(msg2.getMessageRef())
        })
        /* eslint-enable arrow-body-style */
    }

    isStaleMessage(streamMessage: Todo) {
        const msgRef = streamMessage.getMessageRef()
        return (
            this.lastReceivedMsgRef
            && msgRef.compareTo(this.lastReceivedMsgRef) <= 0
        )
    }

    add(unorderedStreamMessage: Todo) {
        if (this.isStaleMessage(unorderedStreamMessage)) {
            const msgRef = unorderedStreamMessage.getMessageRef()
            // Prevent double-processing of messages for any reason
            debug('Already received message: %o, lastReceivedMsgRef: %o. Ignoring message.', msgRef, this.lastReceivedMsgRef)
            return
        }

        if (this._isNextMessage(unorderedStreamMessage)) {
            this._process(unorderedStreamMessage)
        } else {
            this.queue.push(unorderedStreamMessage)
        }

        this._checkQueue()
    }

    markMessageExplicitly(streamMessage: Todo) {
        if (!streamMessage || this.isStaleMessage(streamMessage)) {
            // do nothing if already past/handled this message
            return
        }

        this.markedExplicitly.add(streamMessage)
        this.add(streamMessage)
    }

    clearGap() {
        this.inProgress = false
        clearTimeout(this.firstGap)
        clearInterval(this.nextGaps)
        this.nextGaps = undefined
        this.firstGap = undefined
    }

    _isNextMessage(unorderedStreamMessage: Todo) {
        const isFirstMessage = this.lastReceivedMsgRef === null
        return isFirstMessage
            // is chained and next
            || (unorderedStreamMessage.prevMsgRef !== null && unorderedStreamMessage.prevMsgRef.compareTo(this.lastReceivedMsgRef) === 0)
            // is unchained and newer
            || (unorderedStreamMessage.prevMsgRef === null && unorderedStreamMessage.getMessageRef().compareTo(this.lastReceivedMsgRef) > 0)
    }

    _checkQueue() {
        while (!this.queue.empty()) {
            const msg = this.queue.peek()
            if (msg && this._isNextMessage(msg)) {
                this.queue.pop()
                // If the next message is found in the queue, current gap must have been filled, so clear the timer
                this.clearGap()
                this._process(msg)
            } else {
                // @ts-ignore TODO bug?
                this._scheduleGap(msg)
                break
            }
        }
    }

    _process(msg: Todo) {
        this.lastReceivedMsgRef = msg.getMessageRef()

        if (this.markedExplicitly.has(msg)) {
            this.markedExplicitly.delete(msg)
            this.emit('skip', msg)
        } else {
            this.inOrderHandler(msg)
        }
    }

    _scheduleGap() {
        if (this.inProgress) {
            return
        }

        this.gapRequestCount = 0
        this.inProgress = true
        clearTimeout(this.firstGap)
        this.firstGap = setTimeout(() => {
            this._requestGapFill()
            if (!this.inProgress) { return }
            clearInterval(this.nextGaps)
            this.nextGaps = setInterval(() => {
                if (!this.inProgress) {
                    clearInterval(this.nextGaps)
                    return
                }
                this._requestGapFill()
            }, this.resendTimeout)
        }, this.propagationTimeout)
    }

    _requestGapFill() {
        if (!this.inProgress) { return }
        const from = new MessageRef(this.lastReceivedMsgRef.timestamp, this.lastReceivedMsgRef.sequenceNumber + 1)
        const to = this.queue.peek().prevMsgRef
        if (this.gapRequestCount < MAX_GAP_REQUESTS) {
            this.gapRequestCount += 1
            this.gapHandler(from, to, this.publisherId, this.msgChainId)
        } else {
            this.emit('error', new GapFillFailedError(from, to, this.publisherId, this.msgChainId, MAX_GAP_REQUESTS))
            this.clearGap()
            this.lastReceivedMsgRef = null
            this._checkQueue()
        }
    }
}
