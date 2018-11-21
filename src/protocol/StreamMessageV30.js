import StreamMessageV28 from './StreamMessageV28'

class StreamMessageV30 extends StreamMessageV28 {
    constructor(
        streamId, streamPartition, timestamp, sequenceNumber, producerId,
        ttl, offset, previousOffset, contentType, content, signatureType, signature,
    ) {
        super(streamId, streamPartition, timestamp, ttl, offset, previousOffset, contentType, content)
        this.sequenceNumber = sequenceNumber
        this.producerId = producerId
        this.signatureType = signatureType
        this.signature = signature
    }

    toObject(parsedContent = false, compact = true) {
        if (compact) {
            return [
                30,
                this.streamId,
                this.streamPartition,
                this.timestamp,
                this.sequenceNumber,
                this.producerId,
                this.ttl,
                this.offset,
                this.previousOffset,
                this.contentType,
                (parsedContent ? this.getParsedContent() : this.getSerializedContent()),
                this.signatureType,
                this.signature,
            ]
        }
        return {
            streamId: this.streamId,
            streamPartition: this.streamPartition,
            timestamp: this.timestamp,
            sequenceNumber: this.sequenceNumber,
            producerId: this.producerId,
            ttl: this.ttl,
            offset: this.offset,
            previousOffset: this.previousOffset,
            contentType: this.contentType,
            content: (parsedContent ? this.getParsedContent() : this.getSerializedContent()),
            signatureType: this.signatureType,
            signature: this.signature,
        }
    }
}

module.exports = StreamMessageV30
