import assert from 'assert'

import ResendFromRequestSerializerV2
    from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestSerializerV2'
import ResendFromRequest from '../../../../src/protocol/control_layer/resend_request/ResendFromRequest'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new ResendFromRequest(VERSION, 'requestId', 'streamId', 0,
    [132846894, 0], 'publisherId', 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, ResendFromRequest.TYPE, 'requestId', 'streamId', 0, [132846894, 0], 'publisherId', 'sessionToken'])

describe('ResendFromRequestSerializerV2', () => {

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
