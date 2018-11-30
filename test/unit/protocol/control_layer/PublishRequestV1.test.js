import assert from 'assert'
import PublishRequest from '../../../../src/protocol/control_layer/PublishRequest'
import PublishRequestV1 from '../../../../src/protocol/control_layer/PublishRequestV1'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'

describe('PublishRequestV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [[30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken', 'apiKey']
            const result = new PublishRequestV1(...arr)
            assert(result.streamMessage instanceof StreamMessage)
            assert.equal(result.sessionToken, 'sessionToken')
            assert.equal(result.apiKey, 'apiKey')
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, PublishRequest.TYPE, [30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken', 'apiKey']

            const serialized = new PublishRequestV1(
                [30, ['streamId', 0, 1529549961116, 0, 'address'], [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON,
                    '{"valid": "json"}', 1, 'signature'],
                'sessionToken',
                'apiKey',
            ).serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
