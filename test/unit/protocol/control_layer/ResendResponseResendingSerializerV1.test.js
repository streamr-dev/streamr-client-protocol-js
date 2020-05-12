import assert from 'assert'

import ResendResponseResendingSerializerV1
    from '../../../../src/protocol/control_layer/resend_response/ResendResponseResendingSerializerV1'
import ResendResponseResending from '../../../../src/protocol/control_layer/resend_response/ResendResponseResending'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new ResendResponseResending(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, ResendResponseResending.TYPE, 'streamId', 0, 'requestId'])

describe('ResendResponseResendingSerializerV1', () => {
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
