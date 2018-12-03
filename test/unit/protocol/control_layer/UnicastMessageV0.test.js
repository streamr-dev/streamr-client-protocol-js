import assert from 'assert'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV30 from '../../../../src/protocol/message_layer/StreamMessageV30'
import UnicastMessageV0 from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageV0'

describe('UnicastMessageV0', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            const streamMsg = StreamMessageFactory.deserialize(arr)
            const result = new UnicastMessageV0(streamMsg, 1)
            assert(result.streamMessage instanceof StreamMessageV30)
            assert.strictEqual(result.subId, 1)
        })
    })
    describe('serialize', () => {
        let unicastMessage
        let expectedPayloadArray
        let serialized
        beforeEach(() => {
            const streamMessageArray = [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            unicastMessage = new UnicastMessageV0(StreamMessageFactory.deserialize(streamMessageArray), 1)
        })
        afterEach(() => {
            const arr = [0, 1, 1, expectedPayloadArray]
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
        it('correctly serializes messages with default version (30) payload', () => {
            expectedPayloadArray = [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            serialized = unicastMessage.serialize()
        })
        it('correctly serializes messages with version 29 payload', () => {
            expectedPayloadArray = [29, 'streamId', 0, 1529549961116, 0,
                null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']
            serialized = unicastMessage.serialize(29)
        })
        it('correctly serializes messages with version 28 payload', () => {
            expectedPayloadArray = [28, 'streamId', 0, 1529549961116, 0,
                null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']
            serialized = unicastMessage.serialize(28)
        })
    })
})
