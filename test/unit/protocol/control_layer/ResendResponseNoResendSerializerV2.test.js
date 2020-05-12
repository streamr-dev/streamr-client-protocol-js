import assert from 'assert'

import ResendResponseNoResendSerializerV2
    from '../../../../src/protocol/control_layer/resend_response/ResendResponseNoResendSerializerV2'
import ResendResponseNoResend from '../../../../src/protocol/control_layer/resend_response/ResendResponseNoResend'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new ResendResponseNoResend(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, ResendResponseNoResend.TYPE, 'requestId', 'streamId', 0])

describe('ResendResponseNoResendSerializerV2', () => {
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
