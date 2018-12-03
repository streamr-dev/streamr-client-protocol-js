import assert from 'assert'
import UnicastMessageV1 from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageV1'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV30 from '../../../../src/protocol/message_layer/StreamMessageV30'

describe('BroadcastMessageV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [[30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 1]
            const result = new UnicastMessageV1(...arr)
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
            broadcastMessage = new UnicastMessageV1(streamMessageArray, 1)
        })
        afterEach(() => {
            const arr = [1, 1, 1, expectedPayloadArray]
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
