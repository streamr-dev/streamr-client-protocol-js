import assert from 'assert'
import SubscribeRequest from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequest'
import SubscribeRequestV1 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('SubscribeRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => SubscribeRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a SubscribeRequestV1', () => {
            const arr = ['streamId', 0, 'sessionToken']
            const result = SubscribeRequest.deserialize(1, arr)
            assert(result instanceof SubscribeRequestV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = SubscribeRequest.create('streamId', 0, 'sessionToken')
            assert(msg instanceof SubscribeRequestV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.sessionToken, 'sessionToken')
        })
    })
})
