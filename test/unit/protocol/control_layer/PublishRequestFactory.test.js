import assert from 'assert'
import PublishRequestFactory from '../../../../src/protocol/control_layer/publish_request/PublishRequestFactory'
import PublishRequestV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'

describe('PublishRequestFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => PublishRequestFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a PublishRequestV1', () => {
            const arr = [[30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'], 'sessionToken']
            const result = PublishRequestFactory.deserialize(1, arr)
            assert(result instanceof PublishRequestV1)
        })
    })
})
