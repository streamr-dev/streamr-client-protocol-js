import assert from 'assert'

import StorageNodesMessage from '../../../../src/protocol/control_layer/storage_nodes_message/StorageNodesMessage'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('StorageNodesMessage', () => {
    describe('constructor', () => {
        it('throws on null nodeAddresses', () => {
            assert.throws(() => new StorageNodesMessage({
                requestId: 'requestId',
                streamId: 'streamId',
                streamPartition: 0,
                nodeAddresses: null
            }), ValidationError)
        })
        it('throws on null streamPartition', () => {
            assert.throws(() => new StorageNodesMessage({
                requestId: 'requestId',
                streamId: 'streamId',
                streamPartition: null,
                nodeAddresses: []
            }), ValidationError)
        })
        it('throws on null streamId', () => {
            assert.throws(() => new StorageNodesMessage({
                requestId: 'requestId',
                streamId: null,
                streamPartition: 0,
                nodeAddresses: []
            }), ValidationError)
        })
        it('throws on null requestId', () => {
            assert.throws(() => new StorageNodesMessage({
                requestId: null,
                streamId: 'streamId',
                streamPartition: 0,
                nodeAddresses: []
            }), ValidationError)
        })
        it('should create the latest version', () => {
            const msg = new StorageNodesMessage({
                requestId: 'requestId',
                streamId: 'streamId',
                streamPartition: 0,
                nodeAddresses: []
            })
            assert(msg instanceof StorageNodesMessage)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.strictEqual(msg.streamId, 'streamId')
            assert.strictEqual(msg.streamPartition, 0)
            assert.deepStrictEqual(msg.nodeAddresses, [])
        })
    })
})
