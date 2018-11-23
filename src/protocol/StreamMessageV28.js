import InvalidJsonError from '../errors/InvalidJsonError'
import StreamMessage from './StreamMessage'

const BYE_KEY = '_bye'

class StreamMessageV28 extends StreamMessage {
    constructor(streamId, streamPartition, timestamp, ttl, offset, previousOffset, contentType, content) {
        super()
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.timestamp = timestamp
        this.ttl = ttl
        this.offset = offset
        this.previousOffset = previousOffset
        this.contentType = contentType
        this.content = content
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

    toObject(parsedContent = false, compact = true) {
        if (compact) {
            return [
                28,
                this.streamId,
                this.streamPartition,
                this.timestamp,
                this.ttl,
                this.offset,
                this.previousOffset,
                this.contentType,
                (parsedContent ? this.getParsedContent() : this.getSerializedContent()),
            ]
        }
        return {
            streamId: this.streamId,
            streamPartition: this.streamPartition,
            timestamp: this.timestamp,
            ttl: this.ttl,
            offset: this.offset,
            previousOffset: this.previousOffset,
            contentType: this.contentType,
            content: (parsedContent ? this.getParsedContent() : this.getSerializedContent()),
        }
    }

    serialize() {
        return JSON.stringify(this.toObject())
    }

    isByeMessage() {
        return !!this.getParsedContent()[BYE_KEY]
    }
}

module.exports = StreamMessageV28
