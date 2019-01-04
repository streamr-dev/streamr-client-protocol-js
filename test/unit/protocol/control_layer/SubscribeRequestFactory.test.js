import assert from 'assert'
import SubscribeRequestFactory from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestFactory'
import SubscribeRequestV1 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('SubscribeRequestFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => SubscribeRequestFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a SubscribeRequestV1', () => {
            const arr = ['streamId', 0, 'sessionToken']
            const result = SubscribeRequestFactory.deserialize(1, arr)
            assert(result instanceof SubscribeRequestV1)
        })
    })
})
