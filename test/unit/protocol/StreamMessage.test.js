import assert from 'assert'
import StreamMessageFactory from '../../../src/utils/StreamMessageFactory'
import StreamMessage from '../../../src/protocol/StreamMessage'
import StreamMessageV28 from '../../../src/protocol/StreamMessageV28'
import StreamMessageV29 from '../../../src/protocol/StreamMessageV29'
import StreamMessageV30 from '../../../src/protocol/StreamMessageV30'
import InvalidJsonError from '../../../src/errors/InvalidJsonError'
import UnsupportedVersionError from '../../../src/errors/UnsupportedVersionError'

describe('StreamMessage', () => {
    describe('version 28', () => {
        describe('deserialize', () => {
            it('correctly parses messages', () => {
                const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']
                const result = StreamMessageFactory.deserialize(arr)

                assert(result instanceof StreamMessage)
                assert.equal(result.streamId, 'TsvTbqshTsuLg_HyUjxigA')
                assert.equal(result.streamPartition, 0)
                assert.equal(result.timestamp, 1529549961116)
                assert.equal(result.ttl, 0)
                assert.equal(result.offset, 941516902)
                assert.equal(result.previousOffset, 941499898)
                assert.equal(result.contentType, StreamMessage.CONTENT_TYPES.JSON)
                assert.equal(result.content, '{"valid": "json"}')
            })

            it('throws if the content is invalid', () => {
                const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"invalid\njson"}']
                assert.throws(() => StreamMessageFactory.deserialize(arr), (err) => {
                    assert(err instanceof InvalidJsonError)
                    assert.equal(err.streamId, 'TsvTbqshTsuLg_HyUjxigA')
                    assert.equal(err.jsonString, '{"invalid\njson"}')
                    assert(err.streamMessage instanceof StreamMessage)
                    return true
                })
            })
        })

        describe('serialize', () => {
            it('correctly serializes messages', () => {
                const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']

                const serialized = new StreamMessageV28(
                    'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}',
                ).serialize()

                assert.deepEqual(serialized, JSON.stringify(arr))
            })
        })
    })

    describe('version 29', () => {
        describe('deserialize', () => {
            it('correctly parses messages', () => {
                const arr = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                    941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'address', 'signature']
                const result = StreamMessageFactory.deserialize(arr)

                assert(result instanceof StreamMessage)
                assert.equal(result.streamId, 'TsvTbqshTsuLg_HyUjxigA')
                assert.equal(result.streamPartition, 0)
                assert.equal(result.timestamp, 1529549961116)
                assert.equal(result.ttl, 0)
                assert.equal(result.offset, 941516902)
                assert.equal(result.previousOffset, 941499898)
                assert.equal(result.contentType, StreamMessage.CONTENT_TYPES.JSON)
                assert.equal(result.content, '{"valid": "json"}')
                assert.equal(result.signatureType, 1)
                assert.equal(result.publisherAddress, 'address')
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
        })
    })

    describe('version 30', () => {
        describe('deserialize', () => {
            it('correctly parses messages', () => {
                const arr = [30, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address',
                    0, 941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']
                const result = StreamMessageFactory.deserialize(arr)

                assert(result instanceof StreamMessage)
                assert.equal(result.streamId, 'TsvTbqshTsuLg_HyUjxigA')
                assert.equal(result.streamPartition, 0)
                assert.equal(result.timestamp, 1529549961116)
                assert.equal(result.sequenceNumber, 0)
                assert.equal(result.producerId, 'address')
                assert.equal(result.ttl, 0)
                assert.equal(result.offset, 941516902)
                assert.equal(result.previousOffset, 941499898)
                assert.equal(result.contentType, StreamMessage.CONTENT_TYPES.JSON)
                assert.equal(result.content, '{"valid": "json"}')
                assert.equal(result.signatureType, 1)
                assert.equal(result.signature, 'signature')
            })
        })

        describe('serialize', () => {
            it('correctly serializes messages', () => {
                const arr = [30, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address',
                    0, 941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']

                const serialized = new StreamMessageV30(
                    'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address',
                    0, 941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature',
                ).serialize()

                assert.deepEqual(serialized, JSON.stringify(arr))
            })
        })
    })

    describe('unsupported version', () => {
        describe('deserialize', () => {
            it('throws', () => {
                const arr = [123]
                assert.throws(() => StreamMessageFactory.deserialize(arr), (err) => {
                    assert(err instanceof UnsupportedVersionError)
                    assert.equal(err.version, 123)
                    return true
                })
            })
        })
    })

    describe('getParsedContent()', () => {
        it('returns an object if the constructor was given an object', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV28('streamId', 0, Date.now(), 0, 1, null, StreamMessage.CONTENT_TYPES.JSON, content)
            assert.deepEqual(msg.getParsedContent(), content)
        })
        it('returns an object if the constructor was given a string', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV28('streamId', 0, Date.now(), 0, 1, null, StreamMessage.CONTENT_TYPES.JSON, JSON.stringify(content))
            assert.deepEqual(msg.getParsedContent(), content)
        })
    })

    describe('toObject()', () => {
        it('parseContent == true', () => {
            const object = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, {
                    valid: 'json',
                }]

            const msg = new StreamMessageV28(
                'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}',
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
            }

            const msg = new StreamMessageV28(
                'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}',
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
            }

            const msg = new StreamMessageV28(
                'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}',
            )

            assert.deepEqual(msg.toObject(true, false), object)
        })
    })
})
