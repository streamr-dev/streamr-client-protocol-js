import assert from 'assert'
import ResendResponseResending from '../../../../src/protocol/control_layer/resend_response_resending/ResendResponseResending'
import ResendResponseResendingV0 from '../../../../src/protocol/control_layer/resend_response_resending/ResendResponseResendingV0'
import ResendResponseResendingV1 from '../../../../src/protocol/control_layer/resend_response_resending/ResendResponseResendingV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendResponseResending', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendResponseResending.deserialize(123, undefined), (err) => {
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
            const result = ResendResponseResending.deserialize(0, arr)
            assert(result instanceof ResendResponseResendingV0)
        })
        it('should return a ResendResponseResendingV1', () => {
            const arr = ['streamId', 0, 'subId']
            const result = ResendResponseResending.deserialize(1, arr)
            assert(result instanceof ResendResponseResendingV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendResponseResending.create('streamId', 0, 'subId')
            assert(msg instanceof ResendResponseResendingV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.subId, 'subId')
        })
    })
})
