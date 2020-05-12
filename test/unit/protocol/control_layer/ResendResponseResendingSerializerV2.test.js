import assert from 'assert'

import ResendResponseResendingSerializerV2
    from '../../../../src/protocol/control_layer/resend_response/ResendResponseResendingSerializerV2'
import ResendResponseResending from '../../../../src/protocol/control_layer/resend_response/ResendResponseResending'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new ResendResponseResending(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, ResendResponseResending.TYPE, 'requestId', 'streamId', 0])

describe('ResendResponseResendingSerializerV2', () => {
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
