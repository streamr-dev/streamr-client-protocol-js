import assert from 'assert'

import { ResendResponseResending, ControlMessage } from '../../../../src/index'

const VERSION = 2

// Message definitions
const message = new ResendResponseResending({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamid',
    streamPartition: 0,
})
const serializedMessage = JSON.stringify([VERSION, ControlMessage.TYPES.ResendResponseResending, 'requestId', 'streamid', 0])

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
