import ControlMessage from '../ControlMessage'

const TYPE = 11
const VERSION = 1

class ResendLastRequestV1 extends ControlMessage {
    constructor(streamId, streamPartition, subId, numberLast) {
        super(VERSION, TYPE)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.subId = subId
        this.numberLast = numberLast
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.subId,
            this.numberLast,
        ])
        return array
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }
}

/* static */ ResendLastRequestV1.TYPE = TYPE

module.exports = ResendLastRequestV1
