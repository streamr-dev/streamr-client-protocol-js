import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'

const TYPE = 12
const VERSION = 1

class ResendFromRequestV1 extends ControlMessage {
    constructor(streamId, streamPartition, subId, msgRefArgsArray, publisherId) {
        super(VERSION, TYPE)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.subId = subId
        this.fromMsgRef = new MessageRef(...msgRefArgsArray)
        this.publisherId = publisherId
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.subId,
            JSON.parse(this.fromMsgRef.serialize(messageLayerVersion)),
            this.publisherId,
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

/* static */ ResendFromRequestV1.TYPE = TYPE

module.exports = ResendFromRequestV1
