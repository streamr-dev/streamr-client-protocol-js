import assert from 'assert'
import ControlMessageFactory from '../../../../src/protocol/control_layer/ControlMessageFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import PublishRequest from '../../../../src/protocol/control_layer/PublishRequest'

describe('ControlMessageFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            const arr = [123]
            assert.throws(() => ControlMessageFactory.deserialize(arr), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a PublishRequest', () => {
            const arr = [1, PublishRequest.TYPE, [30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken', 'apiKey']
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof PublishRequest)
        })
    })
})
