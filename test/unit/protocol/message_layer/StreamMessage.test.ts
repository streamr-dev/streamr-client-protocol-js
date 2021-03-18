import assert from 'assert'

import sinon from 'sinon'

import { MessageRef, MessageIDStrict, EncryptedGroupKey } from '../../../../src/index'
import ValidationError from '../../../../src/errors/ValidationError'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import { Serializer } from '../../../../src/Serializer'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'

const content = {
    hello: 'world',
}

const newGroupKey = new EncryptedGroupKey('groupKeyId', 'encryptedGroupKeyHex')

const msg = ({ timestamp = 1564046332168, sequenceNumber = 10, ...overrides } = {}) => {
    return new StreamMessage({
        messageId: new MessageIDStrict('streamId', 0, timestamp, sequenceNumber, 'publisherId', 'msgChainId'),
        prevMsgRef: new MessageRef(timestamp, 5),
        content: JSON.stringify(content),
        messageType: StreamMessage.MESSAGE_TYPES.MESSAGE,
        encryptionType: StreamMessage.ENCRYPTION_TYPES.NONE,
        signatureType: StreamMessage.SIGNATURE_TYPES.ETH,
        signature: 'signature',
        newGroupKey,
        ...overrides
    })
}

describe('StreamMessage', () => {
    describe('constructor', () => {
        it('create a StreamMessage with all fields defined', () => {
            const streamMessage = msg()
            assert.strictEqual(streamMessage.getStreamId(), 'streamId')
            assert.strictEqual(streamMessage.getStreamPartition(), 0)
            assert.strictEqual(streamMessage.getTimestamp(), 1564046332168)
            assert.strictEqual(streamMessage.getSequenceNumber(), 10)
            assert.strictEqual(streamMessage.getPublisherId(), 'publisherId')
            assert.strictEqual(streamMessage.getMsgChainId(), 'msgChainId')
            assert.deepStrictEqual(streamMessage.prevMsgRef, new MessageRef(1564046332168, 5))
            assert.strictEqual(streamMessage.messageType, StreamMessage.MESSAGE_TYPES.MESSAGE)
            assert.strictEqual(streamMessage.contentType, StreamMessage.CONTENT_TYPES.JSON)
            assert.strictEqual(streamMessage.encryptionType, StreamMessage.ENCRYPTION_TYPES.NONE)
            assert.strictEqual(streamMessage.groupKeyId, null)
            assert.deepStrictEqual(streamMessage.getContent(), content)
            assert.strictEqual(streamMessage.getSerializedContent(), JSON.stringify(content))
            assert.deepStrictEqual(streamMessage.getNewGroupKey(), newGroupKey)
            assert.strictEqual(streamMessage.signatureType, StreamMessage.SIGNATURE_TYPES.ETH)
            assert.strictEqual(streamMessage.signature, 'signature')
        })

        it('create StreamMessage with minimum fields defined', () => {
            const streamMessage = new StreamMessage({
                messageId: new MessageIDStrict('streamId', 0, 1564046332168, 10, 'publisherId', 'msgChainId'),
                content: JSON.stringify(content),
            })
            assert.strictEqual(streamMessage.getStreamId(), 'streamId')
            assert.strictEqual(streamMessage.getStreamPartition(), 0)
            assert.strictEqual(streamMessage.getTimestamp(), 1564046332168)
            assert.strictEqual(streamMessage.getSequenceNumber(), 10)
            assert.strictEqual(streamMessage.getPublisherId(), 'publisherId')
            assert.strictEqual(streamMessage.getMsgChainId(), 'msgChainId')
            assert.deepStrictEqual(streamMessage.prevMsgRef, null)
            assert.strictEqual(streamMessage.messageType, StreamMessage.MESSAGE_TYPES.MESSAGE)
            assert.strictEqual(streamMessage.contentType, StreamMessage.CONTENT_TYPES.JSON)
            assert.strictEqual(streamMessage.encryptionType, StreamMessage.ENCRYPTION_TYPES.NONE)
            assert.strictEqual(streamMessage.groupKeyId, null)
            assert.deepStrictEqual(streamMessage.getContent(), content)
            assert.strictEqual(streamMessage.getSerializedContent(), JSON.stringify(content))
            assert.strictEqual(streamMessage.getNewGroupKey(), null)
            assert.strictEqual(streamMessage.signatureType, StreamMessage.SIGNATURE_TYPES.NONE)
            assert.strictEqual(streamMessage.signature, null)
        })

        it('create StreamMessage with object as content instead of string', () => {
            const streamMessage = new StreamMessage({
                messageId: new MessageIDStrict('streamId', 0, 1564046332168, 10, 'publisherId', 'msgChainId'),
                content,
            })
            assert.deepStrictEqual(streamMessage.getContent(), content)
            assert.strictEqual(streamMessage.getSerializedContent(), JSON.stringify(content))
        })

        it('should throw if required fields are not defined', () => {
            assert.throws(() => new StreamMessage({
                // missing messageId
                content: JSON.stringify(content),
            } as any), ValidationError)
        })

        it('should throw if content is not defined', () => {
            assert.throws(() => new StreamMessage({
                messageId: new MessageIDStrict('streamId', 0, 1564046332168, 10, 'publisherId', 'msgChainId'),
                // missing content
            } as any), ValidationError)
        })

        it('should not throw when encrypted content', () => {
            assert.doesNotThrow(() => msg({
                // @ts-ignore TODO
                content: 'encrypted content',
                encryptionType: StreamMessage.ENCRYPTION_TYPES.AES,
            }))
        })

        it('Throws with an invalid content type', () => {
            assert.throws(() => msg({
                // @ts-ignore TODO
                contentType: 999, // invalid
            }), ValidationError)
        })

        it('Throws with an invalid newGroupKey', () => {
            assert.throws(() => msg({
                // @ts-ignore TODO
                newGroupKey: 'foo', // invalid
            }), ValidationError)
        })

        describe('prevMsgRef validation', () => {
            it('Throws with identical id + prevMsgRef', () => {
                const ts = Date.now()
                assert.throws(() => msg({
                    timestamp: ts,
                    sequenceNumber: 0,
                    // @ts-ignore TODO
                    prevMsgRef: new MessageRef(ts, 0)
                }), 'must come before current')
            })
            it('Throws with an invalid ts', () => {
                const ts = Date.now()
                assert.throws(() => msg({
                    timestamp: ts,
                    sequenceNumber: 0,
                    // @ts-ignore TODO
                    prevMsgRef: new MessageRef(ts + 1, 0)
                }), 'must come before current')
            })

            it('Throws with an invalid sequence', () => {
                const ts = Date.now()
                assert.throws(() => msg({
                    timestamp: ts,
                    sequenceNumber: 0,
                    // @ts-ignore TODO
                    prevMsgRef: new MessageRef(ts, 1)
                }), 'must come before current')
            })

            it('Throws with an invalid ts + seq', () => {
                const ts = Date.now()
                assert.throws(() => msg({
                    timestamp: ts,
                    sequenceNumber: 0,
                    // @ts-ignore TODO
                    prevMsgRef: new MessageRef(ts + 1, 1)
                }), 'must come before current')
            })

            it('works with valid seq', () => {
                const ts = Date.now()
                msg({
                    timestamp: ts,
                    sequenceNumber: 1,
                    // @ts-ignore TODO
                    prevMsgRef: new MessageRef(ts, 0)
                })
            })

            it('works with valid ts', () => {
                const ts = Date.now()
                msg({
                    timestamp: ts,
                    sequenceNumber: 0,
                    // @ts-ignore TODO
                    prevMsgRef: new MessageRef(ts - 1, 0)
                })
            })

            it('works with no prevMsgRef', () => {
                const ts = Date.now()
                msg({
                    timestamp: ts,
                    sequenceNumber: 0,
                    // @ts-ignore TODO
                    prevMsgRef: null
                })
            })
        })
    })

    describe('serialization', () => {
        let serializer: Serializer<StreamMessage>
        const VERSION = StreamMessage.LATEST_VERSION + 100

        beforeEach(() => {
            serializer = {
                fromArray: sinon.stub(),
                toArray: sinon.stub(),
            }
            StreamMessage.unregisterSerializer(VERSION)
            StreamMessage.registerSerializer(VERSION, serializer)
        })

        afterEach(() => {
            StreamMessage.unregisterSerializer(VERSION)
        })

        describe('registerSerializer', () => {
            beforeEach(() => {
                // Start from a clean slate
                StreamMessage.unregisterSerializer(VERSION)
            })

            it('registers a Serializer retrievable by getSerializer()', () => {
                StreamMessage.registerSerializer(VERSION, serializer)
                assert.strictEqual(StreamMessage.getSerializer(VERSION), serializer)
            })
            it('throws if the Serializer for a version is already registered', () => {
                StreamMessage.registerSerializer(VERSION, serializer)
                assert.throws(() => StreamMessage.registerSerializer(VERSION, serializer))
            })
            it('throws if the Serializer does not implement fromArray', () => {
                const invalidSerializer: any = {
                    toArray: sinon.stub()
                }
                assert.throws(() => StreamMessage.registerSerializer(VERSION, invalidSerializer))
            })
            it('throws if the Serializer does not implement toArray', () => {
                const invalidSerializer: any = {
                    fromArray: sinon.stub()
                }
                assert.throws(() => StreamMessage.registerSerializer(VERSION, invalidSerializer))
            })
        })

        describe('serialize', () => {
            const m = msg()

            it('calls toArray() on the configured serializer and stringifies it', () => {
                serializer.toArray = sinon.stub().returns([12345])
                assert.strictEqual(m.serialize(VERSION), '[12345]')
                assert((serializer.toArray as any).calledWith(m))
            })

            it('should throw on unsupported version', () => {
                assert.throws(() => m.serialize(999), (err) => {
                    assert(err instanceof UnsupportedVersionError)
                    assert.strictEqual(err.version, 999)
                    return true
                })
            })
        })

        describe('deserialize', () => {
            it('parses the input, reads version, and calls fromArray() on the configured serializer', () => {
                const arr = [VERSION]
                const m = msg()
                serializer.fromArray = sinon.stub().returns(m)
                assert.strictEqual(StreamMessage.deserialize(JSON.stringify(arr)), m)
                assert((serializer.fromArray as any).calledWith(arr))
            })

            it('should throw on unsupported version', () => {
                const arr = [999]
                assert.throws(() => StreamMessage.deserialize(JSON.stringify(arr)), (err) => {
                    assert(err instanceof UnsupportedVersionError)
                    assert.strictEqual(err.version, 999)
                    return true
                })
            })
        })

        it('returns an array of registered versions', () => {
            assert(StreamMessage.getSupportedVersions().indexOf(VERSION) >= 0)
            assert(StreamMessage.getSupportedVersions().indexOf(999) < 0)
        })
    })

    describe('toString', () => {
        it('provides a log-friendly format', () => {
            expect(msg().toString())
                .toEqual(`StreamMessage{streamId='streamId', streamPartition=0, timestamp=1564046332168, sequenceNumber=10, publisherId='publisherId', ...}`)
        })
    })
})
