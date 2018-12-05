import assert from 'assert'
import ErrorResponseFactory from '../../../../src/protocol/control_layer/error_response/ErrorResponseFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import ErrorResponseV0 from '../../../../src/protocol/control_layer/error_response/ErrorResponseV0'
import ErrorResponseV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseV1'

describe('ErrorResponseFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ErrorResponseFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ErrorResponseV0', () => {
            const arr = [null, {
                error: 'errorMessage',
            }]
            const result = ErrorResponseFactory.deserialize(0, arr)
            assert(result instanceof ErrorResponseV0)
        })
        it('should return a ErrorResponseV1', () => {
            const arr = ['errorMessage']
            const result = ErrorResponseFactory.deserialize(1, arr)
            assert(result instanceof ErrorResponseV1)
        })
    })
})
