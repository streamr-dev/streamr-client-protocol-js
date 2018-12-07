import assert from 'assert'
import ResendResponseNoResendFactory from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResendFactory'
import ResendResponseNoResendV0 from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResendV0'
import ResendResponseNoResendV1 from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResendV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendResponseNoResendFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendResponseNoResendFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendResponseResendingV0', () => {
            const arr = [null, {
                stream: 'streamId',
                partition: 0,
                sub: 'subId',
            }]
            const result = ResendResponseNoResendFactory.deserialize(0, arr)
            assert(result instanceof ResendResponseNoResendV0)
        })
        it('should return a ResendResponseResendingV1', () => {
            const arr = ['streamId', 0, 'subId']
            const result = ResendResponseNoResendFactory.deserialize(1, arr)
            assert(result instanceof ResendResponseNoResendV1)
        })
    })
})
