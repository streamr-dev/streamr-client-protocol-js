import InvalidJsonError from '../../errors/InvalidJsonError'

export default class StreamMessage {
    constructor(version, streamId, ttl, contentType, content) {
        if (new.target === StreamMessage) {
            throw new TypeError('StreamMessage is abstract.')
        }
        this.version = version
        this.streamId = streamId
        this.ttl = ttl
        this.contentType = contentType
        this.serializedContent = this.serializeContent(content)
        this.parsedContent = this.parseContent(content)
    }

    serializeContent(content) {
        if (typeof content === 'string') {
            return content
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON && typeof content === 'object') {
            return JSON.stringify(content)
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON) {
            throw new Error('Stream payloads can only be objects!')
        } else {
            throw new Error(`Unsupported content type: ${this.contentType}`)
        }
    }

    parseContent(content) {
        if (this.contentType === StreamMessage.CONTENT_TYPES.JSON && typeof content === 'object') {
            return content
        } else if (this.contentType === StreamMessage.CONTENT_TYPES.JSON && typeof content === 'string') {
            try {
                return JSON.parse(content)
            } catch (err) {
                throw new InvalidJsonError(
                    this.streamId,
                    content,
                    err,
                    this,
                )
            }
        } else {
            throw new Error(`Unsupported content type: ${this.contentType}`)
        }
    }

    getSerializedContent() {
        return this.serializedContent
    }

    getParsedContent() {
        return this.parsedContent
    }

    getContent(parsedContent = false) {
        if (parsedContent) {
            return this.getParsedContent()
        }
        return this.getSerializedContent()
    }
}

StreamMessage.CONTENT_TYPES = {
    JSON: 27,
}
