import assert from 'assert'
import ResendRangeRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequestV1'
import ResendRangeRequestFactory from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequestFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendRangeRequestFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendRangeRequestFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendRangeRequestV1', () => {
            const arr = ['streamId', 0, 'subId', [132846894, 0], [132847000, 0], 'publisherId', 'sessionToken']
            const result = ResendRangeRequestFactory.deserialize(1, arr)
            assert(result instanceof ResendRangeRequestV1)
        })
    })
})
