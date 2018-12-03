import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

const TYPE = 0

class BroadcastMessage extends ControlMessage {
    constructor(version, streamMessage) {
        super(version, TYPE)
        this.streamMessage = streamMessage
    }

    serialize(messageLayerVersion = StreamMessage.DEFAULT_VERSION) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

/* static */ BroadcastMessage.TYPE = TYPE

module.exports = BroadcastMessage
