import assert from 'assert'
import ResendResponseNoResend from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResend'
import ResendResponseNoResendV0 from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResendV0'
import ResendResponseNoResendV1 from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResendV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendResponseNoResend', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendResponseNoResend.deserialize(123, undefined), (err) => {
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
            const result = ResendResponseNoResend.deserialize(0, arr)
            assert(result instanceof ResendResponseNoResendV0)
        })
        it('should return a ResendResponseResendingV1', () => {
            const arr = ['streamId', 0, 'subId']
            const result = ResendResponseNoResend.deserialize(1, arr)
            assert(result instanceof ResendResponseNoResendV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendResponseNoResend.create('streamId', 0, 'subId')
            assert(msg instanceof ResendResponseNoResendV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.subId, 'subId')
        })
    })
})
