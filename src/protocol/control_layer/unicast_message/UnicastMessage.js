import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

const TYPE = 1

class UnicastMessage extends ControlMessage {
    constructor(version, streamMessage, subId) {
        super(version, TYPE)
        this.streamMessage = streamMessage
        this.subId = subId
    }

    toArray(messageLayerVersion = StreamMessage.DEFAULT_VERSION) {
        const array = super.toArray()
        array.push(...[
            this.subId,
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
        ])
        return array
    }

    serialize(messageLayerVersion = StreamMessage.DEFAULT_VERSION) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

module.exports = UnicastMessage
