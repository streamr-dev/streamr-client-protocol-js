import assert from 'assert'
import SubscribeResponseFactory from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseFactory'
import SubscribeResponseV0 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseV0'
import SubscribeResponseV1 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('SubscribeResponseFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => SubscribeResponseFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a SubscribeResponseV0', () => {
            const arr = [null, {
                stream: 'streamId',
                partition: 0,
            }]
            const result = SubscribeResponseFactory.deserialize(0, arr)
            assert(result instanceof SubscribeResponseV0)
        })
        it('should return a SubscribeResponseV1', () => {
            const arr = ['streamId', 0]
            const result = SubscribeResponseFactory.deserialize(1, arr)
            assert(result instanceof SubscribeResponseV1)
        })
    })
})
