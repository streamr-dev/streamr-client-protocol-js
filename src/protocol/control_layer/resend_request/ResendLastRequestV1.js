import ControlMessage from '../ControlMessage'
import ResendLastRequest from './ResendLastRequest'

const VERSION = 1

export default class ResendLastRequestV1 extends ResendLastRequest {
    constructor(streamId, streamPartition, requestId, numberLast, sessionToken) {
        super(VERSION)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.requestId = requestId
        this.numberLast = numberLast
        this.sessionToken = sessionToken
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.requestId,
            this.numberLast,
            this.sessionToken,
        ])
        return array
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }
}

ControlMessage.registerClass(VERSION, ResendLastRequest.TYPE, ResendLastRequestV1)
