import StreamMessageV28 from './StreamMessageV28'

class StreamMessageV29 extends StreamMessageV28 {
    constructor(streamId, streamPartition, timestamp, ttl, offset, previousOffset, contentType, content, signatureType, publisherAddress, signature) {
        super(streamId, streamPartition, timestamp, ttl, offset, previousOffset, contentType, content)
        this.signatureType = signatureType
        this.publisherAddress = publisherAddress
        this.signature = signature
    }

    toObject(parsedContent = false, compact = true) {
        const v28 = super.toObject(parsedContent, compact)
        if (compact) {
            v28[0] = 29
            v28.push(
                this.signatureType,
                this.publisherAddress,
                this.signature,
            )
        } else {
            v28.signatureType = this.signatureType
            v28.publisherAddress = this.publisherAddress
            v28.signature = this.signature
        }
        return v28
    }
}

module.exports = StreamMessageV29
