import assert from 'assert'
import UnsubscribeRequestFactory from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestFactory'
import UnsubscribeRequestV1 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('UnSubscribeRequestFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            const arr = [123]
            assert.throws(() => UnsubscribeRequestFactory.deserialize(arr), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a UnSubscribeRequestV1', () => {
            const arr = ['streamId', 0]
            const result = UnsubscribeRequestFactory.deserialize(1, arr)
            assert(result instanceof UnsubscribeRequestV1)
        })
    })
})
