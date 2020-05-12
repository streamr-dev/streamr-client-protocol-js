import assert from 'assert'

import ResendFromRequestSerializerV1
    from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestSerializerV1'
import ResendFromRequest from '../../../../src/protocol/control_layer/resend_request/ResendFromRequest'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new ResendFromRequest(VERSION, 'requestId', 'streamId', 0,
    [132846894, 0], 'publisherId', 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, ResendFromRequest.TYPE, 'streamId', 0, 'requestId', [132846894, 0], 'publisherId', null, 'sessionToken'])

describe('ResendFromRequestSerializerV1', () => {

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
