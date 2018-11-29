import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import StreamMessage from './StreamMessage'
import StreamMessageV29 from './StreamMessageV29'
import StreamMessageV30 from './StreamMessageV30'

const BYE_KEY = '_bye'

const VERSION = 28

class StreamMessageV28 extends StreamMessage {
    constructor(streamId, streamPartition, timestamp, ttl, offset, previousOffset, contentType, content) {
        super(VERSION, ttl, contentType, content)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.timestamp = timestamp
        this.offset = offset
        this.previousOffset = previousOffset
    }

    toObject(parsedContent = false, compact = true) {
        if (compact) {
            return [
                this.version,
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

    toOtherVersion(version) {
        if (version === 29) {
            return new StreamMessageV29(
                this.streamId, this.streamPartition, this.timestamp,
                this.ttl, this.offset, this.previousOffset, this.contentType, this.content, 0, null, null,
            )
        } else if (version === 30) {
            return new StreamMessageV30(
                [this.streamId, this.streamPartition, this.timestamp, 0, null],
                [null, null], this.ttl, this.contentType, this.content, 0, null,
            )
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [28, 29, 30]')
    }

    serialize(version = VERSION) {
        if (version === VERSION) {
            return JSON.stringify(this.toObject())
        }
        return this.toOtherVersion(version).serialize()
    }

    isByeMessage() {
        return !!this.getParsedContent()[BYE_KEY]
    }
}

module.exports = StreamMessageV28
