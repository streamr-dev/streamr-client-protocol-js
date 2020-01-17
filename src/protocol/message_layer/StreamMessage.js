import InvalidJsonError from '../../errors/InvalidJsonError'
import ValidationError from '../../errors/ValidationError'

const BYE_KEY = '_bye'
const LATEST_VERSION = 31

export default class StreamMessage {
    constructor(version, streamId, contentType, encryptionType, content, parseContent = true) {
        if (new.target === StreamMessage) {
            throw new TypeError('StreamMessage is abstract.')
        }

        StreamMessage.validateContentType(contentType)
        StreamMessage.validateEncryptionType(encryptionType)

        this.version = version
        this.streamId = streamId
        this.contentType = contentType
        this.encryptionType = encryptionType

        this.parseContentOption = parseContent
        if (parseContent) {
            this.parsedContent = this.parseContent(content)
            this.serializedContent = this.serializeContent(content)
        } else {
            this.content = content
        }
    }

    getStreamId() {
        return this.streamId
    }
    /* eslint-disable class-methods-use-this */
    getStreamPartition() {
        throw new Error('getStreamPartition must be implemented')
    }

    getTimestamp() {
        throw new Error('getTimestamp must be implemented')
    }

    getSequenceNumber() {
        throw new Error('getSequenceNumber must be implemented')
    }

    getPublisherId() {
        throw new Error('getPublisherId must be implemented')
    }

    getMsgChainId() {
        throw new Error('getMsgChainId must be implemented')
    }

    getMessageRef() {
        throw new Error('getMessageRef must be implemented')
    }

    serializeContent(content) {
        if (typeof content === 'string') {
            return content
        } else if (typeof content === 'object') {
            return JSON.stringify(content)
        }
        throw new Error('Stream payloads can only be objects!')
    }
    /* eslint-enable class-methods-use-this */

    parseContent(content) {
        if (this.contentType === StreamMessage.CONTENT_TYPES.MESSAGE && this.encryptionType !== StreamMessage.ENCRYPTION_TYPES.NONE) {
            return content
        } else if (typeof content === 'object') {
            StreamMessage.validateContent(content, this.contentType)
            return content
        } else if (typeof content === 'string') {
            try {
                const parsed = JSON.parse(content)
                StreamMessage.validateContent(parsed, this.contentType)
                return parsed
            } catch (err) {
                throw new InvalidJsonError(
                    this.streamId,
                    content,
                    err,
                    this,
                )
            }
        }
        throw new Error(`Unsupported content type: ${typeof content}`)
    }

    getSerializedContent() {
        if (!this.serializedContent) {
            this.serializedContent = this.serializeContent(this.content)
        }
        return this.serializedContent
    }

    getParsedContent() {
        if (!this.parsedContent) {
            this.parsedContent = this.parseContent(this.content)
        }
        return this.parsedContent
    }

    getContent(parsedContent = false) {
        if (parsedContent) {
            return this.getParsedContent()
        }
        return this.getSerializedContent()
    }

    isByeMessage() {
        return !!this.getParsedContent()[BYE_KEY]
    }

    static create(messageIdArgsArray, prevMessageRefArgsArray, contentType, encryptionType, content, signatureType, signature) {
        const C = StreamMessage.latestClass
        return new C(messageIdArgsArray, prevMessageRefArgsArray, contentType, encryptionType, content, signatureType, signature)
    }

    static from({
        streamId,
        streamPartition,
        timestamp,
        sequenceNumber,
        publisherId,
        msgChainId,
        previousTimestamp = null,
        previousSequenceNumber = null,
        contentType = StreamMessage.CONTENT_TYPES.MESSAGE,
        encryptionType = StreamMessage.ENCRYPTION_TYPES.NONE,
        content,
        signatureType = StreamMessage.SIGNATURE_TYPES.NONE,
        signature = null,
    }) {
        return StreamMessage.create(
            [streamId, streamPartition, timestamp, sequenceNumber, publisherId, msgChainId],
            previousTimestamp == null ? null : [previousTimestamp, previousSequenceNumber],
            contentType,
            encryptionType,
            content,
            signatureType,
            signature,
        )
    }

    static validateContentType(contentType) {
        if (!StreamMessage.VALID_CONTENTS.has(contentType)) {
            throw new ValidationError(`Unsupported content type: ${contentType}`)
        }
    }

    static validateEncryptionType(encryptionType) {
        if (!StreamMessage.VALID_ENCRYPTIONS.has(encryptionType)) {
            throw new ValidationError(`Unsupported encryption type: ${encryptionType}`)
        }
    }

    static validateContent(content, contentType) {
        if (!content) {
            throw new Error('Content cannot be empty.')
        }
        if (contentType === StreamMessage.CONTENT_TYPES.GROUP_KEY_REQUEST) {
            if (!content.publicKey) {
                throw new Error(`Content of type ${contentType} must contain a 'publicKey' field.`)
            } else if (!content.streamId) {
                throw new Error(`Content of type ${contentType} must contain a 'streamId' field.`)
            } else if (content.range && !content.range.start && !content.range.end) {
                throw new Error(`Field 'range' in content of type ${contentType} must contain fields 'start' and 'end'.`)
            }
        } else if (contentType === StreamMessage.CONTENT_TYPES.GROUP_KEY_RESPONSE_SIMPLE) {
            if (!content.streamId) {
                throw new Error(`Content of type ${contentType} must contain a 'streamId' field.`)
            } else if (!content.keys) {
                throw new Error(`Content of type ${contentType} must contain a 'keys' field.`)
            }
            content.keys.forEach((keyResponse) => {
                if (!keyResponse.groupKey || !keyResponse.start) {
                    throw new Error(`Each element in field 'keys' of content of type ${contentType} must contain 'groupKey' and 'start' fields.`)
                }
            })
        } else if (contentType === StreamMessage.CONTENT_TYPES.GROUP_KEY_RESET_SIMPLE) {
            if (!content.streamId || !content.groupKey || !content.start) {
                throw new Error(`Content of type ${contentType} must contain 'streamId', 'groupKey' and 'start' fields.`)
            }
        } else if (contentType === StreamMessage.CONTENT_TYPES.ERROR_MSG) {
            if (!content.code) {
                throw new Error(`Content of type ${contentType} must contain 'code' and 'message' fields.`)
            }
            if (!content.message) {
                throw new Error(`Content of type ${contentType} must contain 'code' and 'message' fields.`)
            }
        }
    }

    static versionSupportsEncryption(streamMessageVersion) {
        return streamMessageVersion >= 31
    }
}

/* static */
StreamMessage.LATEST_VERSION = LATEST_VERSION

StreamMessage.CONTENT_TYPES = {
    MESSAGE: 27,
    GROUP_KEY_REQUEST: 28,
    GROUP_KEY_RESPONSE_SIMPLE: 29,
    GROUP_KEY_RESET_SIMPLE: 30,
    ERROR_MSG: 31,
}
StreamMessage.VALID_CONTENTS = new Set(Object.values(StreamMessage.CONTENT_TYPES))

StreamMessage.SIGNATURE_TYPES = {
    NONE: 0,
    ETH_LEGACY: 1,
    ETH: 2,
}

StreamMessage.ENCRYPTION_TYPES = {
    NONE: 0,
    RSA: 1,
    AES: 2,
    NEW_KEY_AND_AES: 3,
}

StreamMessage.VALID_ENCRYPTIONS = new Set(Object.values(StreamMessage.ENCRYPTION_TYPES))
