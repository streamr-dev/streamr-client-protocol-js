import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { ResendResponseNoResend, ControlMessage } = ControlLayer

const VERSION = 1

// Message definitions
const message = new ResendResponseNoResend(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, ControlMessage.TYPES.ResendResponseNoResend, 'streamId', 0, 'requestId'])

describe('ResendResponseNoResendSerializerV1', () => {
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