import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { StorageNodesResponse, ControlMessage } = ControlLayer

const VERSION = 2

// Message definitions
const message = new StorageNodesResponse({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamId',
    streamPartition: 10,
    nodeAddresses: ['ws://address-1', 'ws://address-2']
})
const serializedMessage = JSON.stringify([
    VERSION,
    ControlMessage.TYPES.StorageNodesResponse,
    'requestId',
    'streamId',
    10,
    ['ws://address-1', 'ws://address-2']
])

describe('StorageNodesResponseSerializerV2', () => {
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
