import assert from 'assert'
import ResendFromRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestV1'
import ResendFromRequest from '../../../../src/protocol/control_layer/resend_request/ResendFromRequest'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendFromRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendFromRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendFromRequestV1', () => {
            const arr = ['streamId', 0, 'subId', [132846894, 0], 'producerId', 'sessionToken']
            const result = ResendFromRequest.deserialize(1, arr)
            assert(result instanceof ResendFromRequestV1)
        })
    })
})
