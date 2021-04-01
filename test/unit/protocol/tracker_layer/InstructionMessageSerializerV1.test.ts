import assert from 'assert'

import { TrackerLayer } from '../../../../src'
import TrackerMessage from '../../../../src/protocol/tracker_layer/TrackerMessage'

const { InstructionMessage } = TrackerLayer

const VERSION = 1

// Message definitions
const message = new InstructionMessage({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamid',
    streamPartition: 10,
    nodeIds: ['node-1', 'node-2'],
    counter: 100
})
const serializedMessage = JSON.stringify([
    VERSION,
    TrackerMessage.TYPES.InstructionMessage,
    'requestId',
    'streamid',
    10,
    ['node-1', 'node-2'],
    100
])

describe('InstructionMessageSerializerV1', () => {
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
