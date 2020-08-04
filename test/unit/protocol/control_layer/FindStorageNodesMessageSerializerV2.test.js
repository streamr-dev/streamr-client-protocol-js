import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { FindStorageNodesMessage, ControlMessage } = ControlLayer

const VERSION = 2

// Message definitions
const message = new FindStorageNodesMessage({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamId',
    streamPartition: 10
})
const serializedMessage = JSON.stringify([
    VERSION,
    ControlMessage.TYPES.FindStorageNodesMessage,
    'requestId',
    'streamId',
    10
])

describe('FindStorageNodesMessageSerializerV2', () => {
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
