import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import StreamMessage from './StreamMessage'
import StreamMessageV28 from './StreamMessageV28'
import StreamMessageV29 from './StreamMessageV29'
import MessageID from './MessageID'
import MessageRef from './MessageRef'

const VERSION = 30

export default class StreamMessageV30 extends StreamMessage {
    constructor(messageIdArgsArray, prevMessageRefArgsArray, ttl, contentType, content, signatureType, signature) {
        super(VERSION, undefined, ttl, contentType, content)
        this.messageId = new MessageID(...messageIdArgsArray)
        this.prevMessageRef = new MessageRef(...prevMessageRefArgsArray)
        this.signatureType = signatureType
        this.signature = signature
    }

    getStreamId() {
        return this.messageId.streamId
    }

    getStreamPartition() {
        return this.messageId.streamPartition
    }

    getTimestamp() {
        return this.messageId.timestamp
    }

    getPublisherId() {
        return this.messageId.publisherId
    }

    toArray(parsedContent = false) {
        return [
            this.version,
            this.messageId.toArray(),
            this.prevMessageRef.toArray(),
            this.ttl,
            this.contentType,
            this.getContent(parsedContent),
            this.signatureType,
            this.signature,
        ]
    }

    toOtherVersion(version) {
        if (version === 28) {
            // hack for resend and gap detection: messageId.timestamp --> offset, prevMessageRef.timestamp --> previousOffset
            return new StreamMessageV28(
                this.messageId.streamId, this.messageId.streamPartition, this.messageId.timestamp,
                this.ttl, this.messageId.timestamp, this.prevMessageRef.timestamp, this.contentType, this.getContent(),
            )
        } else if (version === 29) {
            // hack for resend and gap detection: messageId.timestamp --> offset, prevMessageRef.timestamp --> previousOffset
            return new StreamMessageV29(
                this.messageId.streamId, this.messageId.streamPartition, this.messageId.timestamp,
                this.ttl, this.messageId.timestamp, this.prevMessageRef.timestamp, this.contentType, this.getContent(),
                this.signatureType, this.messageId.publisherId, this.signature,
            )
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [28, 29, 30]')
    }

    serialize(version = VERSION) {
        if (version === VERSION) {
            return JSON.stringify(this.toArray())
        }
        return this.toOtherVersion(version).serialize()
    }
}
