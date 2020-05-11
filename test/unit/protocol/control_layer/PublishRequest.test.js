import assert from 'assert'

import PublishRequest from '../../../../src/protocol/control_layer/publish_request/PublishRequest'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('PublishRequest', () => {
    const streamMessage = StreamMessageFactory.deserialize([30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address', 'msg-chain-id'],
        [1529549961000, 0], StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])

    describe('validation', () => {
        it('throws on null streamMessage', () => {
            assert.throws(() => new PublishRequest(ControlMessage.LATEST_VERSION, 'requestId', null, 'sessionToken'), ValidationError)
        })
        it('throws on invalid sessionToken', () => {
            assert.throws(() => new PublishRequest(ControlMessage.LATEST_VERSION, 'requestId', streamMessage, 123), ValidationError)
        })
    })

    describe('create', () => {
        it('should create a BroadcastMessage with correct fields', () => {
            const msg = PublishRequest.create('requestId', streamMessage, 'sessionToken')
            assert(msg instanceof PublishRequest)
            assert(msg.version = ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.strictEqual(msg.streamMessage, streamMessage)
            assert.strictEqual(msg.sessionToken, 'sessionToken')
        })
    })
})
