import assert from 'assert'

import ErrorResponseSerializerV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseSerializerV1'
import ErrorResponse from '../../../../src/protocol/control_layer/error_response/ErrorResponse'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new ErrorResponse(VERSION, null, 'error message', null)
const serializedMessage = JSON.stringify([VERSION, ErrorResponse.TYPE, 'error message'])

describe('ErrorResponseSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(VERSION), serializedMessage)
        })
    })
})
