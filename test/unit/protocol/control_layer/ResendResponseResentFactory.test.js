import assert from 'assert'
import ResendResponseResentFactory from '../../../../src/protocol/control_layer/resend_response_resent/ResendResponseResentFactory'
import ResendResponseResentV0 from '../../../../src/protocol/control_layer/resend_response_resent/ResendResponseResentV0'
import ResendResponseResentV1 from '../../../../src/protocol/control_layer/resend_response_resent/ResendResponseResentV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendResponseResentFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendResponseResentFactory.deserialize(123, undefined), (err) => {
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
            const result = ResendResponseResentFactory.deserialize(0, arr)
            assert(result instanceof ResendResponseResentV0)
        })
        it('should return a ResendResponseResendingV1', () => {
            const arr = ['streamId', 0, 'subId']
            const result = ResendResponseResentFactory.deserialize(1, arr)
            assert(result instanceof ResendResponseResentV1)
        })
    })
})
