import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { InstructionMessage, ControlMessage } = ControlLayer

const VERSION = 2

// Message definitions
const message = new InstructionMessage({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamId',
    streamPartition: 10,
    nodeAddresses: ['ws://address-1', 'ws://address-2']
})
const serializedMessage = JSON.stringify([
    VERSION,
    ControlMessage.TYPES.InstructionMessage,
    'requestId',
    'streamId',
    10,
    ['ws://address-1', 'ws://address-2']
])

describe('InstructionMessageSerializerV2', () => {
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
