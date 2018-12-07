import assert from 'assert'
import ResendFromRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestV1'
import ResendFromRequestFactory from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendFromRequestFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendFromRequestFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendLastRequestV1', () => {
            const arr = ['subId', ['streamId', 0, 132846894, 0, 'producerId']]
            const result = ResendFromRequestFactory.deserialize(1, arr)
            assert(result instanceof ResendFromRequestV1)
        })
    })
})
