import assert from 'assert'

import FindStorageNodesMessage from '../../../../src/protocol/control_layer/find_storage_nodes_message/FindStorageNodesMessage'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('FindStorageNodesMessage', () => {
    describe('constructor', () => {
        it('throws on null streamPartition', () => {
            assert.throws(() => new FindStorageNodesMessage({
                requestId: 'requestId',
                streamId: 'streamId',
                streamPartition: null
            }), ValidationError)
        })
        it('throws on null streamId', () => {
            assert.throws(() => new FindStorageNodesMessage({
                requestId: 'requestId',
                streamId: null,
                streamPartition: 0
            }), ValidationError)
        })
        it('throws on null requestId', () => {
            assert.throws(() => new FindStorageNodesMessage({
                requestId: null,
                streamId: 'streamId',
                streamPartition: 0
            }), ValidationError)
        })
        it('should create the latest version', () => {
            const msg = new FindStorageNodesMessage({
                requestId: 'requestId',
                streamId: 'streamId',
                streamPartition: 0
            })
            assert(msg instanceof FindStorageNodesMessage)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.strictEqual(msg.streamId, 'streamId')
            assert.strictEqual(msg.streamPartition, 0)
        })
    })
})
