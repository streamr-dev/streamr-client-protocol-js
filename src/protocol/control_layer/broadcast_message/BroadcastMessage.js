import ControlMessage from '../ControlMessage'

const TYPE = 0

export default class BroadcastMessage extends ControlMessage {
    constructor(version) {
        if (new.target === BroadcastMessage) {
            throw new TypeError('BroadcastMessage is abstract.')
        }
        super(version, TYPE)
    }

    serialize(controlLayerVersion = this.version, messageLayerVersion) {
        if (controlLayerVersion === this.version) {
            return JSON.stringify(this.toArray(messageLayerVersion))
        }
        return this.toOtherVersion(controlLayerVersion, messageLayerVersion).serialize()
    }
}

/* static */ BroadcastMessage.TYPE = TYPE
