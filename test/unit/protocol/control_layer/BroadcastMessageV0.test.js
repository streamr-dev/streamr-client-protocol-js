import assert from 'assert'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV30 from '../../../../src/protocol/message_layer/StreamMessageV30'
import BroadcastMessageV0 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV0'

describe('BroadcastMessageV0', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [null, [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']]
            const streamMsg = StreamMessageFactory.deserialize(arr[1])
            const result = new BroadcastMessageV0(streamMsg)
            assert(result.payload instanceof StreamMessageV30)
        })
    })
    describe('serialize', () => {
        describe('serialize version 0', () => {
            let broadcastMessage
            let expectedPayloadArray
            let serialized
            beforeEach(() => {
                const streamMessageArray = [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                    0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
                broadcastMessage = new BroadcastMessageV0(StreamMessageFactory.deserialize(streamMessageArray))
            })
            afterEach(() => {
                const arr = [0, 0, null, expectedPayloadArray]
                assert(typeof serialized === 'string')
                assert.deepEqual(arr, JSON.parse(serialized))
            })
            it('correctly serializes messages with default version (30) payload', () => {
                expectedPayloadArray = [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                    0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
                serialized = broadcastMessage.serialize()
            })
            it('correctly serializes messages with version 29 payload', () => {
                expectedPayloadArray = [29, 'streamId', 0, 1529549961116, 0,
                    null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']
                serialized = broadcastMessage.serialize(0, 29)
            })
            it('correctly serializes messages with version 28 payload', () => {
                expectedPayloadArray = [28, 'streamId', 0, 1529549961116, 0,
                    null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']
                serialized = broadcastMessage.serialize(0, 28)
            })
        })
        it('correctly serializes to version 1', () => {
            const streamMessageArray = [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            const arr = [1, 0, streamMessageArray]
            const serialized = new BroadcastMessageV0(StreamMessageFactory.deserialize(streamMessageArray)).serialize(1)
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
