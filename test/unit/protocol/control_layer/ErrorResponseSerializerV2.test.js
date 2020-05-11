import assert from 'assert'

import ErrorResponseSerializerV2 from '../../../../src/protocol/control_layer/error_response/ErrorResponseSerializerV2'
import ErrorResponse from '../../../../src/protocol/control_layer/error_response/ErrorResponse'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

describe('ErrorResponseSerializerV2', () => {
    const deserializedMessage = new ErrorResponse(VERSION, 'requestId', 'error message', 'ERROR_CODE')
    const serializedMessage = JSON.stringify([VERSION, ErrorResponse.TYPE, 'requestId', 'error message', 'ERROR_CODE'])

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
