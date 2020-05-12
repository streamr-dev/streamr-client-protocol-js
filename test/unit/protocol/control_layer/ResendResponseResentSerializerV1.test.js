import assert from 'assert'

import ResendResponseResentSerializerV1
    from '../../../../src/protocol/control_layer/resend_response/ResendResponseResentSerializerV1'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ResendResponseResent from '../../../../src/protocol/control_layer/resend_response/ResendResponseResent'

const VERSION = 1

// Message definitions
const message = new ResendResponseResent(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, ResendResponseResent.TYPE, 'streamId', 0, 'requestId'])

describe('ResendResponseResentSerializerV1', () => {
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
