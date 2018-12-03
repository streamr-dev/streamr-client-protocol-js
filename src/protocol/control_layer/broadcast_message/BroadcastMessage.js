import ControlMessage from '../ControlMessage'

const TYPE = 0

class BroadcastMessage extends ControlMessage {
    constructor(version, streamMessage) {
        super(version, TYPE)
        this.streamMessage = streamMessage
    }
}

/* static */ BroadcastMessage.TYPE = TYPE

module.exports = BroadcastMessage
