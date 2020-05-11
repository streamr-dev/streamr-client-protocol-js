import assert from 'assert'

import ErrorResponse from '../../../../src/protocol/control_layer/error_response/ErrorResponse'
import ErrorResponseSerializerV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseSerializerV1'

describe('ErrorResponse', () => {
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ErrorResponse.create('error message')
            assert(msg instanceof ErrorResponseSerializerV1)
            assert.strictEqual(msg.errorMessage, 'error message')
        })
    })
})
