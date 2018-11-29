import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import StreamMessage from './StreamMessage'
import StreamMessageV28 from './StreamMessageV28'
import StreamMessageV29 from './StreamMessageV29'
import MessageID from './MessageID'
import MessageRef from './MessageRef'

const VERSION = 30

class StreamMessageV30 extends StreamMessage {
    constructor(messageIdArgsArray, prevMessageRefArgsArray, ttl, contentType, content, signatureType, signature) {
        super(VERSION, ttl, contentType, content)
        this.messageId = new MessageID(...messageIdArgsArray)
        this.prevMessageRef = new MessageRef(...prevMessageRefArgsArray)
        this.signatureType = signatureType
        this.signature = signature
    }

    toArray(parsedContent = false) {
        return [
            this.version,
            this.messageId.toArray(),
            this.prevMessageRef.toArray(),
            this.ttl,
            this.contentType,
            (parsedContent ? this.getParsedContent() : this.getSerializedContent()),
            this.signatureType,
            this.signature,
        ]
    }

    toOtherVersion(version) {
        if (version === 28) {
            return new StreamMessageV28(
                this.messageId.streamId, this.messageId.streamPartition, this.messageId.timestamp,
                this.ttl, null, null, this.contentType, this.content,
            )
        } else if (version === 29) {
            return new StreamMessageV29(
                this.messageId.streamId, this.messageId.streamPartition, this.messageId.timestamp,
                this.ttl, null, null, this.contentType, this.content, this.signatureType, this.messageId.producerId, this.signature,
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

module.exports = StreamMessageV30
