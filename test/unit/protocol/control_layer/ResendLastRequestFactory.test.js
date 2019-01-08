import assert from 'assert'
import ResendLastRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendLastRequestV1'
import ResendLastRequestFactory from '../../../../src/protocol/control_layer/resend_request/ResendLastRequestFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendLastRequestFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendLastRequestFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendLastRequestV1', () => {
            const arr = ['streamId', 0, 'subId', 100, 'sessionToken']
            const result = ResendLastRequestFactory.deserialize(1, arr)
            assert(result instanceof ResendLastRequestV1)
        })
    })
})
