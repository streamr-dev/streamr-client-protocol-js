// @ts-nocheck
import assert from 'assert'

import ValidationError from '../../../../src/errors/ValidationError'
import { ControlLayer, MessageLayer } from '../../../../src/index'

const { StreamMessage, MessageID } = MessageLayer
const { BroadcastMessage, ControlMessage } = ControlLayer

describe('BroadcastMessage', () => {
    describe('constructor', () => {
        it('throws on null streamMessage', () => {
            assert.throws(() => new BroadcastMessage({
                requestId: 'requestId',
            }), ValidationError)
        })
        it('throws on bogus streamMessage', () => {
            assert.throws(() => new BroadcastMessage({
                requestId: 'requestId',
                streamMessage: {
                    fake: true
                },
            }), ValidationError)
        })
        it('should create the latest version', () => {
            const streamMessage = new StreamMessage({
                messageId: new MessageID('streamId', 0, 1529549961116, 0, 'publisherId', 'msgChainId'),
                content: {},
            })
            const msg = new BroadcastMessage({
                requestId: 'requestId',
                streamMessage,
            })
            assert(msg instanceof BroadcastMessage)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.strictEqual(msg.streamMessage, streamMessage)
        })
    })
})
