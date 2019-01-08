import assert from 'assert'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV29 from '../../../../src/protocol/message_layer/StreamMessageV29'

describe('StreamMessageV29', () => {
    describe('version 29', () => {
        describe('deserialize', () => {
            it('correctly parses messages', () => {
                const arr = ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']
                const result = new StreamMessageV29(...arr)

                assert(result instanceof StreamMessage)
                assert.equal(result.getStreamId(), 'TsvTbqshTsuLg_HyUjxigA')
                assert.equal(result.getStreamPartition(), 0)
                assert.equal(result.getTimestamp(), 1529549961116)
                assert.equal(result.ttl, 0)
                assert.equal(result.offset, 941516902)
                assert.equal(result.previousOffset, 941499898)
                assert.equal(result.contentType, StreamMessage.CONTENT_TYPES.JSON)
                assert.equal(result.getContent(), '{"valid": "json"}')
                assert.equal(result.signatureType, 1)
                assert.equal(result.getPublisherId(), 'address')
                assert.equal(result.signature, 'signature')
            })
        })

        describe('serialize', () => {
            it('correctly serializes messages', () => {
                const arr = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']

                const serialized = new StreamMessageV29(
                    'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature',
                ).serialize()

                assert.deepEqual(serialized, JSON.stringify(arr))
            })
            it('correctly serializes messages to v28', () => {
                const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']

                const serialized = new StreamMessageV29(
                    'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature',
                ).serialize(28)

                assert.deepEqual(serialized, JSON.stringify(arr))
            })
            it('correctly serializes messages to v30', () => {
                const arr = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                    [null, null], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']

                const serialized = new StreamMessageV29(
                    'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature',
                ).serialize(30)

                assert.deepEqual(serialized, JSON.stringify(arr))
            })
        })
    })

    describe('getParsedContent()', () => {
        it('returns an object if the constructor was given an object', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV29(
                'streamId', 0, Date.now(), 0, 1, null, StreamMessage.CONTENT_TYPES.JSON, content,
                1, 'address', 'signature',
            )
            assert.deepEqual(msg.getParsedContent(), content)
        })
        it('returns an object if the constructor was given a string', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV29(
                'streamId', 0, Date.now(), 0, 1, null, StreamMessage.CONTENT_TYPES.JSON, JSON.stringify(content),
                1, 'address', 'signature',
            )
            assert.deepEqual(msg.getParsedContent(), content)
        })
    })

    describe('toObject()', () => {
        it('parseContent == true', () => {
            const object = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, {
                    valid: 'json',
                }, 1, 'address', 'signature']

            const msg = new StreamMessageV29(
                'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature',
            )

            assert.deepEqual(msg.toObject(true), object)
        })

        it('compact == false', () => {
            const object = {
                streamId: 'TsvTbqshTsuLg_HyUjxigA',
                streamPartition: 0,
                timestamp: 1529549961116,
                ttl: 0,
                offset: 941516902,
                previousOffset: 941499898,
                contentType: StreamMessage.CONTENT_TYPES.JSON,
                content: '{"valid": "json"}',
                signatureType: 1,
                publisherAddress: 'address',
                signature: 'signature',
            }

            const msg = new StreamMessageV29(
                'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature',
            )

            assert.deepEqual(msg.toObject(undefined, false), object)
        })

        it('parseContent == true, compact == false', () => {
            const object = {
                streamId: 'TsvTbqshTsuLg_HyUjxigA',
                streamPartition: 0,
                timestamp: 1529549961116,
                ttl: 0,
                offset: 941516902,
                previousOffset: 941499898,
                contentType: StreamMessage.CONTENT_TYPES.JSON,
                content: {
                    valid: 'json',
                },
                signatureType: 1,
                publisherAddress: 'address',
                signature: 'signature',
            }

            const msg = new StreamMessageV29(
                'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature',
            )

            assert.deepEqual(msg.toObject(true, false), object)
        })
    })
})
