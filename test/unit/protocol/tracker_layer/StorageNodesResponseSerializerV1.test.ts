import assert from 'assert'

import { StorageNodesResponse } from '../../../../src'
import TrackerMessage from '../../../../src/protocol/tracker_layer/TrackerMessage'

const VERSION = 1

// Message definitions
const message = new StorageNodesResponse({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamid',
    streamPartition: 10,
    nodeIds: ['node-1', 'node-2']
})
const serializedMessage = JSON.stringify([
    VERSION,
    TrackerMessage.TYPES.StorageNodesResponse,
    'requestId',
    'streamid',
    10,
    ['node-1', 'node-2']
])

describe('StorageNodesResponseSerializerV1', () => {
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
