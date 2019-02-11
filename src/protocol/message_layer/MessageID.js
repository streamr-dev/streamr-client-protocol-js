class MessageID {
    constructor(streamId, streamPartition, timestamp, sequenceNumber, publisherId, chainId) {
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.timestamp = timestamp
        this.sequenceNumber = sequenceNumber
        this.publisherId = publisherId
        this.chainId = chainId
    }

    toArray() {
        return [
            this.streamId,
            this.streamPartition,
            this.timestamp,
            this.sequenceNumber,
            this.publisherId,
            this.chainId,
        ]
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }
}

module.exports = MessageID
