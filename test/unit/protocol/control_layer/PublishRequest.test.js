import assert from 'assert'
import PublishRequest from '../../../../src/protocol/control_layer/publish_request/PublishRequest'
import PublishRequestV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'

describe('PublishRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => PublishRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a PublishRequestV1', () => {
            const arr = [[30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'], 'sessionToken']
            const result = PublishRequest.deserialize(1, arr)
            assert(result instanceof PublishRequestV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const streamMsg = StreamMessageFactory.deserialize([30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])
            const msg = PublishRequest.create(streamMsg, 'sessionToken')
            assert(msg instanceof PublishRequestV1)
            assert(msg.streamMessage instanceof StreamMessage)
            assert.strictEqual(msg.sessionToken, 'sessionToken')
        })
    })
})
