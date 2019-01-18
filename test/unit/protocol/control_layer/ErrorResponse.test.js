import assert from 'assert'
import ErrorResponse from '../../../../src/protocol/control_layer/error_response/ErrorResponse'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import ErrorResponseV0 from '../../../../src/protocol/control_layer/error_response/ErrorResponseV0'
import ErrorResponseV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseV1'

describe('ErrorResponseFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ErrorResponse.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ErrorResponseV0', () => {
            const arr = [null, {
                error: 'errorMessage',
            }]
            const result = ErrorResponse.deserialize(0, arr)
            assert(result instanceof ErrorResponseV0)
        })
        it('should return a ErrorResponseV1', () => {
            const arr = ['errorMessage']
            const result = ErrorResponse.deserialize(1, arr)
            assert(result instanceof ErrorResponseV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ErrorResponse.create('error message')
            assert(msg instanceof ErrorResponseV1)
            assert.strictEqual(msg.errorMessage, 'error message')
        })
    })
})
