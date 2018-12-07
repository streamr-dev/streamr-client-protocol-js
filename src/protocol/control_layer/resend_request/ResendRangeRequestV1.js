import ControlMessage from '../ControlMessage'
import ValidationError from '../../../errors/ValidationError'
import MessageID from '../../message_layer/MessageID'

const TYPE = 13
const VERSION = 1

class ResendRangeRequestV1 extends ControlMessage {
    constructor(subId, fromMsgIdArgsArray, toMsgIdArgsArray) {
        super(VERSION, TYPE)
        this.subId = subId
        this.fromMsgId = new MessageID(...fromMsgIdArgsArray)
        this.toMsgId = new MessageID(...toMsgIdArgsArray)
        if (this.fromMsgId.streamId !== this.toMsgId.streamId) {
            throw new ValidationError('fromMsgId.streamId and toMsgId.streamId must be equal')
        }
        if (this.fromMsgId.streamPartition !== this.toMsgId.streamPartition) {
            throw new ValidationError('fromMsgId.streamPartition and toMsgId.streamPartition must be equal')
        }
        if (this.fromMsgId.producerId !== this.toMsgId.producerId) {
            throw new ValidationError('fromMsgId.producerId and toMsgId.producerId must be equal')
        }
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.subId,
            JSON.parse(this.fromMsgId.serialize(messageLayerVersion)),
            JSON.parse(this.toMsgId.serialize(messageLayerVersion)),
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

/* static */ ResendRangeRequestV1.TYPE = TYPE

module.exports = ResendRangeRequestV1
