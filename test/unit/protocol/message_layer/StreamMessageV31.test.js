import assert from 'assert'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import MessageRef from '../../../../src/protocol/message_layer/MessageRef'
import StreamMessageV31 from '../../../../src/protocol/message_layer/StreamMessageV31'

describe('StreamMessageV31', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = [['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, '{"valid": "json"}',
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature']
            const result = new StreamMessageV31(...arr)

            assert(result instanceof StreamMessageV31)
            assert.equal(result.getStreamId(), 'TsvTbqshTsuLg_HyUjxigA')
            assert.equal(result.getStreamPartition(), 0)
            assert.equal(result.getTimestamp(), 1529549961116)
            assert.equal(result.messageId.sequenceNumber, 0)
            assert.equal(result.getPublisherId(), 'publisherId')
            assert.deepStrictEqual(result.getMessageRef(), new MessageRef(1529549961116, 0))
            assert.equal(result.messageId.msgChainId, 'msg-chain-id')
            assert.equal(result.prevMsgRef.timestamp, 1529549961000)
            assert.equal(result.prevMsgRef.sequenceNumber, 0)
            assert.equal(result.contentType, StreamMessage.CONTENT_TYPES.JSON)
            assert.equal(result.encryptionType, StreamMessage.ENCRYPTION_TYPES.NONE)
            assert.equal(result.getContent(), '{"valid": "json"}')
            assert.equal(result.signatureType, StreamMessage.SIGNATURE_TYPES.ETH)
            assert.equal(result.signature, 'signature')
        })
    })

    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const content = {
                foo: 'bar',
            }
            const arr = [31, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.AES, JSON.stringify(content),
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature']

            const serialized = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.AES, content, StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            ).serialize()

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
        it('correctly serializes messages without stringify', () => {
            const content = {
                foo: 'bar',
            }
            const arr = [31, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.AES, JSON.stringify(content),
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature']

            const serialized = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.AES, content, StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            ).serialize(31, {
                stringify: false,
            })

            assert.deepEqual(serialized, arr)
        })
        it('correctly serializes messages with no signature', () => {
            const content = {
                foo: 'bar',
            }
            const arr = [31, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.RSA, JSON.stringify(content),
                StreamMessage.SIGNATURE_TYPES.NONE, null]

            const serialized = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.RSA, content, StreamMessage.SIGNATURE_TYPES.NONE,
            ).serialize()

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
        it('correctly serializes messages with no previous ref', () => {
            const content = {
                foo: 'bar',
            }
            const arr = [31, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.RSA, JSON.stringify(content),
                StreamMessage.SIGNATURE_TYPES.NONE, null]

            const serialized = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'],
                null, StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.RSA, content, StreamMessage.SIGNATURE_TYPES.NONE,
            ).serialize()

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
        it('correctly serializes messages to v29', () => {
            const arr = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 1529549961116, 1529549961000,
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'publisherId', 'signature']

            const serialized = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.RSA, '{"valid": "json"}',
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            ).serialize(29)

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
        it('correctly serializes messages to v28', () => {
            const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                1529549961116, 1529549961000, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']

            const serialized = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.RSA, '{"valid": "json"}',
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            ).serialize(28)

            assert.deepEqual(serialized, JSON.stringify(arr))
        })
    })

    describe('getParsedContent()', () => {
        it('returns an object if the constructor was given an object', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV31(
                ['streamId', 0, Date.now(), 0, 'publisherId', 1], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, content,
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            )
            assert.deepEqual(msg.getParsedContent(), content)
        })
        it('returns an object if the constructor was given a string', () => {
            const content = {
                foo: 'bar',
            }
            const msg = new StreamMessageV31(
                ['streamId', 0, Date.now(), 0, 'publisherId', 1], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, JSON.stringify(content),
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            )
            assert.deepEqual(msg.getParsedContent(), content)
        })
    })

    describe('toArray()', () => {
        it('parsedContent == true', () => {
            const array = [31, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'],
                [1529549961000, 0], StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    valid: 'json',
                }, StreamMessage.SIGNATURE_TYPES.ETH, 'signature']

            const msg = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, '{"valid": "json"}',
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            )

            assert.deepEqual(msg.toArray(true), array)
        })

        it('parsedContent == false', () => {
            const array = [31, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'],
                [1529549961000, 0], StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, '{"valid": "json"}',
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature']

            const msg = new StreamMessageV31(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, '{"valid": "json"}',
                StreamMessage.SIGNATURE_TYPES.ETH, 'signature',
            )

            assert.deepEqual(msg.toArray(), array)
        })
    })

    describe('validation', () => {
        it('should throw if it does not define all fields', () => {
            assert.throws(() => StreamMessage.create(
                [undefined, 0], null, StreamMessage.CONTENT_TYPES.JSON, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    foo: 'bar',
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            ), (err) => {
                assert.equal(err.message, 'streamId must be defined!')
                return true
            })
        })
        it('Throws with an invalid content type', () => {
            assert.throws(() => StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null, 128, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    foo: 'bar',
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            ), (err) => {
                assert.equal(err.message, 'Unsupported content type: 128')
                return true
            })
        })
        it('Throws with an invalid content of type GROUP_KEY_REQUEST', () => {
            assert.throws(() => StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.GROUP_KEY_REQUEST, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    wrongField: 'some-public-key',
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            ), (err) => {
                assert.equal(err.message, 'Content of type 28 must contain a \'publicKey\' field.')
                return true
            })
        })
        it('Does not throws with a valid content of type GROUP_KEY_REQUEST', () => {
            StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.GROUP_KEY_REQUEST, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    publicKey: 'some-public-key',
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            )
        })
        it('Throws with an invalid content of type GROUP_KEY_RESPONSE_SIMPLE (1)', () => {
            assert.throws(() => StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.GROUP_KEY_RESPONSE_SIMPLE, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    foo: 'bar',
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            ), (err) => {
                assert.equal(err.message, 'Content of type 29 must be an array of objects.')
                return true
            })
        })
        it('Throws with an invalid content of type GROUP_KEY_RESPONSE_SIMPLE (2)', () => {
            assert.throws(() => StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.GROUP_KEY_RESPONSE_SIMPLE, StreamMessage.ENCRYPTION_TYPES.NONE, [{
                    groupKey: 'some-group-key',
                    start: 23314,
                }, {
                    groupKey: 'some-group-key2',
                    wrong: 233142345,
                }],
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            ), (err) => {
                assert.equal(err.message, 'Each element in content of type 29 must contain \'groupKey\' and \'start\' fields.')
                return true
            })
        })
        it('Does not throws with a valid content of type GROUP_KEY_RESET_SIMPLE', () => {
            StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.GROUP_KEY_RESET_SIMPLE, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    groupKey: 'some-group-key',
                    start: 96789,
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            )
        })
        it('Throws with an invalid content of type GROUP_KEY_RESET_SIMPLE', () => {
            assert.throws(() => StreamMessage.create(
                ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'publisherId', 'msg-chain-id'], null,
                StreamMessage.CONTENT_TYPES.GROUP_KEY_RESET_SIMPLE, StreamMessage.ENCRYPTION_TYPES.NONE, {
                    groupKey: 'some-group-key2',
                    wrong: 233142345,
                },
                StreamMessage.SIGNATURE_TYPES.NONE, null,
            ), (err) => {
                assert.equal(err.message, 'Content of type 30 must contain \'groupKey\' and \'start\' fields.')
                return true
            })
        })
    })
})