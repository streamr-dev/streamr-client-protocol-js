import ControlMessage from '../ControlMessage'

const TYPE = 0

class BroadcastMessage extends ControlMessage {
    constructor(version, streamMessage) {
        if (new.target === BroadcastMessage) {
            throw new TypeError('BroadcastMessage is abstract.')
        }
        super(version, TYPE)
        this.streamMessage = streamMessage
    }

    serialize(controlLayerVersion = this.version, messageLayerVersion) {
        if (controlLayerVersion === this.version) {
            return JSON.stringify(this.toArray(messageLayerVersion))
        }
        return this.toOtherVersion(controlLayerVersion).serialize()
    }
}

/* static */ BroadcastMessage.TYPE = TYPE

module.exports = BroadcastMessage
