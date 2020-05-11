import assert from 'assert'

import ErrorResponseSerializerV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseSerializerV1'

describe('ErrorResponseSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['errorMessage']
            const result = new ErrorResponseSerializerV1(...arr)
            assert(result instanceof ErrorResponseSerializerV1)
            assert.equal(result.errorMessage, 'errorMessage')
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, 7, 'errorMessage']
            const serialized = new ErrorResponseSerializerV1('errorMessage').serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
        it('correctly serializes messages to version 0', () => {
            const arr = [0, 7, null, {
                error: 'errorMessage',
            }]
            const serialized = new ErrorResponseSerializerV1('errorMessage').serialize(0)
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
