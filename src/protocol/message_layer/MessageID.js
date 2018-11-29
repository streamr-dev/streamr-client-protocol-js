class MessageID {
    constructor(streamId, streamPartition, timestamp, sequenceNumber, producerId) {
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.timestamp = timestamp
        this.sequenceNumber = sequenceNumber
        this.producerId = producerId
    }

    toArray() {
        return [
            this.streamId,
            this.streamPartition,
            this.timestamp,
            this.sequenceNumber,
            this.producerId,
        ]
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }
}

module.exports = MessageID
