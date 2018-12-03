import assert from 'assert'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV30 from '../../../../src/protocol/message_layer/StreamMessageV30'
import BroadcastMessageV0 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV0'

describe('BroadcastMessageV0', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            const streamMsg = StreamMessageFactory.deserialize(arr)
            const result = new BroadcastMessageV0(streamMsg)
            assert(result.streamMessage instanceof StreamMessageV30)
        })
    })
    describe('serialize', () => {
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
            serialized = broadcastMessage.serialize(29)
        })
        it('correctly serializes messages with version 28 payload', () => {
            expectedPayloadArray = [28, 'streamId', 0, 1529549961116, 0,
                null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']
            serialized = broadcastMessage.serialize(28)
        })
    })
})
