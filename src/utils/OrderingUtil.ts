import { Todo } from '../sharedTypes'
import OrderedMsgChain from './OrderedMsgChain'

export default class OrderingUtil {

    streamId: Todo
    streamPartition: Todo
    inOrderHandler: Todo
    gapHandler: Todo
    propagationTimeout: Todo
    resendTimeout: Todo
    orderedChains: Todo

    constructor(streamId: Todo, streamPartition: Todo, inOrderHandler: Todo, gapHandler: Todo, propagationTimeout: Todo, resendTimeout: Todo) {
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.inOrderHandler = inOrderHandler
        this.gapHandler = gapHandler
        this.propagationTimeout = propagationTimeout
        this.resendTimeout = resendTimeout
        this.orderedChains = {}
    }

    add(unorderedStreamMessage: Todo) {
        const chain = this._getChain(unorderedStreamMessage.getPublisherId(), unorderedStreamMessage.getMsgChainId())
        chain.add(unorderedStreamMessage)
    }

    _getChain(publisherId: Todo, msgChainId: Todo) {
        const key = publisherId + msgChainId
        if (!this.orderedChains[key]) {
            this.orderedChains[key] = new OrderedMsgChain(
                publisherId, msgChainId, this.inOrderHandler, this.gapHandler,
                this.propagationTimeout, this.resendTimeout,
            )
        }
        return this.orderedChains[key]
    }

    markMessageExplicitly(streamMessage: Todo) {
        const chain = this._getChain(streamMessage.getPublisherId(), streamMessage.getMsgChainId())
        chain.markMessageExplicitly(streamMessage)
    }

    clearGaps() {
        Object.keys(this.orderedChains).forEach((key) => {
            this.orderedChains[key].clearGap()
        })
    }
}
