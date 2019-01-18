import assert from 'assert'
import UnsubscribeRequest from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequest'
import UnsubscribeRequestV1 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('UnsubscribeRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => UnsubscribeRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a UnSubscribeRequestV1', () => {
            const arr = ['streamId', 0]
            const result = UnsubscribeRequest.deserialize(1, arr)
            assert(result instanceof UnsubscribeRequestV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = UnsubscribeRequest.create('streamId', 0)
            assert(msg instanceof UnsubscribeRequestV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
        })
    })
})
