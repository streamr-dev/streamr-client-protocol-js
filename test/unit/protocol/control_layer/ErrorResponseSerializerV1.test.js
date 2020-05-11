import assert from 'assert'

import ErrorResponseSerializerV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseSerializerV1'
import ErrorResponse from '../../../../src/protocol/control_layer/error_response/ErrorResponse'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

describe('ErrorResponseSerializerV1', () => {
    const deserializedMessage = new ErrorResponse(VERSION, null, 'error message', null)
    const serializedMessage = JSON.stringify([VERSION, ErrorResponse.TYPE, 'error message'])

    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), deserializedMessage)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(deserializedMessage.serialize(VERSION), serializedMessage)
        })
    })
})
