import InvalidJsonError from '../../errors/InvalidJsonError'

const DEFAULT_VERSION = 30

export default class StreamMessage {
    constructor(version, ttl, contentType, content) {
        if (new.target === StreamMessage) {
            throw new TypeError('StreamMessage is abstract.')
        }
        this.version = version
        this.ttl = ttl
        this.contentType = contentType
        this.content = content
    }

    getSerializedContent() {
        if (typeof this.content === 'string') {
            return this.content
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON && typeof this.content === 'object') {
            return JSON.stringify(this.content)
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON) {
            throw new Error('Stream payloads can only be objects!')
        } else {
            throw new Error(`Unsupported content type: ${this.contentType}`)
        }
    }

    getParsedContent() {
        if (this.parsedContent !== undefined) {
            return this.parsedContent
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON && typeof this.content === 'object') {
            this.parsedContent = this.content
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON && typeof this.content === 'string') {
            try {
                this.parsedContent = JSON.parse(this.content)
            } catch (err) {
                throw new InvalidJsonError(
                    this.streamId,
                    this.content,
                    err,
                    this,
                )
            }
        } else {
            throw new Error(`Unsupported content type: ${this.contentType}`)
        }

        return this.parsedContent
    }
}

StreamMessage.CONTENT_TYPES = {
    JSON: 27,
}

StreamMessage.DEFAULT_VERSION = DEFAULT_VERSION
