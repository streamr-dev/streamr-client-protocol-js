import assert from 'assert'
import ControlMessageFactory from '../../../../src/protocol/control_layer/ControlMessageFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import PublishRequest from '../../../../src/protocol/control_layer/publish_request/PublishRequest'
import PublishRequestV0 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV0'
import PublishRequestV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV1'

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
        it('should return a PublishRequestV0', () => {
            const msg = {
                type: 'publish',
                stream: 'streamId',
                authKey: 'authKey',
                sessionToken: 'sessionToken',
                msg: JSON.stringify({
                    foo: 'bar',
                }),
                ts: 1533924184016,
                pkey: 'deviceId',
                addr: 'publisherAddress',
                sigtype: 1,
                sig: 'signature',
            }
            const result = ControlMessageFactory.deserialize(JSON.stringify(msg))
            assert(result instanceof PublishRequestV0)
        })
        it('should return a PublishRequestV1', () => {
            const arr = [1, PublishRequest.TYPE, [30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken', 'apiKey']
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof PublishRequestV1)
        })
    })
})
