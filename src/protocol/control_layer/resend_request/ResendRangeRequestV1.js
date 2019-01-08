import ControlMessage from '../ControlMessage'
import ValidationError from '../../../errors/ValidationError'
import MessageRef from '../../message_layer/MessageRef'

const TYPE = 13
const VERSION = 1

class ResendRangeRequestV1 extends ControlMessage {
    constructor(streamId, streamPartition, subId, fromMsgRefArgsArray, toMsgRefArgsArray, publisherId) {
        super(VERSION, TYPE)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.subId = subId
        this.fromMsgRef = new MessageRef(...fromMsgRefArgsArray)
        this.toMsgRef = new MessageRef(...toMsgRefArgsArray)
        if (this.fromMsgRef.timestamp > this.toMsgRef.timestamp) {
            throw new ValidationError('fromMsgRef.timestamp must be less than or equal to toMsgRef.timestamp')
        }
        this.publisherId = publisherId
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.subId,
            JSON.parse(this.fromMsgRef.serialize(messageLayerVersion)),
            JSON.parse(this.toMsgRef.serialize(messageLayerVersion)),
            this.publisherId,
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

/* static */ ResendRangeRequestV1.TYPE = TYPE

module.exports = ResendRangeRequestV1
