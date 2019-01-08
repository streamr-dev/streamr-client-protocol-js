import assert from 'assert'
import PublishRequest from '../../../../src/protocol/control_layer/publish_request/PublishRequest'
import PublishRequestV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV1'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'

describe('PublishRequestV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [[30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken']
            const result = new PublishRequestV1(...arr)
            assert(result.getStreamMessage() instanceof StreamMessage)
            assert.equal(result.sessionToken, 'sessionToken')
        })
    })
    describe('serialize', () => {
        let publishRequest
        let expectedPayloadArray
        let serialized
        beforeEach(() => {
            publishRequest = new PublishRequestV1(
                [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON,
                    '{"valid": "json"}', 1, 'signature'],
                'sessionToken',
            )
        })
        afterEach(() => {
            const arr = [1, PublishRequest.TYPE, expectedPayloadArray, 'sessionToken']
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
        it('correctly serializes messages with default version (30) payload', () => {
            expectedPayloadArray = [30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            serialized = publishRequest.serialize()
        })
        it('correctly serializes messages with version 29 payload', () => {
            expectedPayloadArray = [29, 'streamId', 0, 1529549961116, 0,
                1529549961116, 1529549961000, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']
            serialized = publishRequest.serialize(29)
        })
        it('correctly serializes messages with version 28 payload', () => {
            expectedPayloadArray = [28, 'streamId', 0, 1529549961116, 0,
                1529549961116, 1529549961000, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']
            serialized = publishRequest.serialize(28)
        })
    })
})
