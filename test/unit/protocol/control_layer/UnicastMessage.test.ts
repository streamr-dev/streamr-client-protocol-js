// @ts-nocheck
import assert from 'assert'

import ValidationError from '../../../../src/errors/ValidationError'
import { ControlLayer, MessageLayer } from '../../../../src/index'

const { StreamMessage, MessageID } = MessageLayer
const { UnicastMessage, ControlMessage } = ControlLayer

describe('UnicastMessage', () => {
    describe('constructor', () => {
        it('throws on null streamMessage', () => {
            assert.throws(() => new UnicastMessage({
                requestId: 'requestId',
                streamMessage: null,
            }), ValidationError)
        })
        it('throws on bogus streamMessage', () => {
            assert.throws(() => new UnicastMessage({
                requestId: 'requestId',
                streamMessage: {
                    fake: true,
                },
            }), ValidationError)
        })
        it('should create the latest version', () => {
            const streamMessage = new StreamMessage({
                messageId: new MessageID('streamId', 0, 12345, 0, 'publisherId', 'msgChainId'),
                content: {},
            })

            const msg = new UnicastMessage({
                requestId: 'requestId',
                streamMessage,
            })
            assert(msg instanceof UnicastMessage)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert(msg.streamMessage instanceof StreamMessage)
            assert.strictEqual(msg.requestId, 'requestId')
        })
    })
})
