import assert from 'assert'

import { TrackerLayer } from '../../../../src'
import TrackerMessage from "../../../../src/protocol/tracker_layer/TrackerMessage";

const { InstructionMessage } = TrackerLayer

const VERSION = 1

// Message definitions
const message = new InstructionMessage({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamId',
    streamPartition: 10,
    nodeAddresses: ['ws://address-1', 'ws://address-2'],
    counter: 100
})
const serializedMessage = JSON.stringify([
    VERSION,
    TrackerMessage.TYPES.InstructionMessage,
    'requestId',
    'streamId',
    10,
    ['ws://address-1', 'ws://address-2'],
    100
])

describe('InstructionMessageSerializerV2', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(TrackerMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(VERSION), serializedMessage)
        })
    })
})
