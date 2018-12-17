import assert from 'assert'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV30 from '../../../../src/protocol/message_layer/StreamMessageV30'

describe('StreamMessageV30', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
            const result = new StreamMessageV30(...arr)

            assert(result instanceof StreamMessageV30)
            assert.equal(result.getStreamId(), 'TsvTbqshTsuLg_HyUjxigA')
            assert.equal(result.messageId.streamPartition, 0)
            assert.equal(result.messageId.timestamp, 1529549961116)
            assert.equal(result.messageId.sequenceNumber, 0)
            assert.equal(result.messageId.producerId, 'address')
            assert.equal(result.prevMessageRef.timestamp, 1529549961000)
            assert.equal(result.prevMessageRef.sequenceNumber, 0)
            assert.equal(result.ttl, 0)
            assert.equal(result.contentType, StreamMessage.CONTENT_TYPES.JSON)
            assert.equal(result.getContent(), '{"valid": "json"}')
            assert.equal(result.signatureType, 1)
            assert.equal(result.signature, 'signature')
        })
    })

    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']

            const serialized = new StreamMessageV30(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature',
            ).serialize()

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
        it('correctly serializes messages to v29', () => {
            const arr = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']

            const serialized = new StreamMessageV30(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature',
            ).serialize(29)

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
        it('correctly serializes messages to v28', () => {
            const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                null, null, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']

            const serialized = new StreamMessageV30(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature',
            ).serialize(28)

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
    })

    describe('getParsedContent()', () => {
        it('returns an object if the constructor was given an object', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV30(
                ['streamId', 0, Date.now(), 0, 'address'], [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, content,
                1, 'signature',
            )
            assert.deepEqual(msg.getParsedContent(), content)
        })
        it('returns an object if the constructor was given a string', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV30(
                ['streamId', 0, Date.now(), 0, 'address'], [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, JSON.stringify(content),
                1, 'signature',
            )
            assert.deepEqual(msg.getParsedContent(), content)
        })
    })

    describe('toArray()', () => {
        it('parsedContent == true', () => {
            const array = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, {
                    valid: 'json',
                }, 1, 'signature']

            const msg = new StreamMessageV30(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0], 0,
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature',
            )

            assert.deepEqual(msg.toArray(true), array)
        })

        it('parsedContent == false', () => {
            const array = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']

            const msg = new StreamMessageV30(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0], 0,
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature',
            )

            assert.deepEqual(msg.toArray(), array)
        })
    })
})
