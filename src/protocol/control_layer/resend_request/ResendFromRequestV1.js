import ControlMessage from '../ControlMessage'
import MessageID from '../../message_layer/MessageID'

const TYPE = 12
const VERSION = 1

class ResendFromRequestV1 extends ControlMessage {
    constructor(subId, msgIdArgsArray) {
        super(VERSION, TYPE)
        this.subId = subId
        this.msgId = new MessageID(...msgIdArgsArray)
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.subId,
            JSON.parse(this.msgId.serialize(messageLayerVersion)),
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

/* static */ ResendFromRequestV1.TYPE = TYPE

module.exports = ResendFromRequestV1
