import assert from 'assert'

import ResendLastRequestSerializerV1
    from '../../../../src/protocol/control_layer/resend_request/ResendLastRequestSerializerV1'
import ResendLastRequest from '../../../../src/protocol/control_layer/resend_request/ResendLastRequest'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new ResendLastRequest(VERSION, 'requestId', 'streamId', 0, 100, 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, ResendLastRequest.TYPE, 'streamId', 0, 'requestId', 100, 'sessionToken'])

describe('ResendLastRequestSerializerV1', () => {
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
