import assert from 'assert'
import ResendResponseResent from '../../../../src/protocol/control_layer/resend_response_resent/ResendResponseResent'
import ResendResponseResentV0 from '../../../../src/protocol/control_layer/resend_response_resent/ResendResponseResentV0'
import ResendResponseResentV1 from '../../../../src/protocol/control_layer/resend_response_resent/ResendResponseResentV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendResponseResent', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendResponseResent.deserialize(123, undefined), (err) => {
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
            const result = ResendResponseResent.deserialize(0, arr)
            assert(result instanceof ResendResponseResentV0)
        })
        it('should return a ResendResponseResendingV1', () => {
            const arr = ['streamId', 0, 'subId']
            const result = ResendResponseResent.deserialize(1, arr)
            assert(result instanceof ResendResponseResentV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendResponseResent.create('streamId', 0, 'subId')
            assert(msg instanceof ResendResponseResentV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.subId, 'subId')
        })
    })
})
