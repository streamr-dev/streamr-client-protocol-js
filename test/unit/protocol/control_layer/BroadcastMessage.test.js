import assert from 'assert'

import BroadcastMessage from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessage'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('BroadcastMessage', () => {
    describe('validation', () => {
        it('throws on null streamMessage', () => {
            assert.throws(() => new BroadcastMessage(ControlMessage.LATEST_VERSION, 'requestId', null), ValidationError)
        })
        it('throws on bogus streamMessage', () => {
            assert.throws(() => new BroadcastMessage(ControlMessage.LATEST_VERSION, 'requestId', {fake: true}), ValidationError)
        })
    })

    describe('create', () => {
        it('should create the latest version', () => {
            const streamMessage = StreamMessageFactory.deserialize([30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address', 'msg-chain-id'],
                [1529549961000, 0], StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])

            const msg = BroadcastMessage.create('requestId', streamMessage)
            assert(msg instanceof BroadcastMessage)
            assert(msg.version = ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.strictEqual(msg.streamMessage, streamMessage)
        })
    })
})
