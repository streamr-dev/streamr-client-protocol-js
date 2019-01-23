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

    static create(streamMessage) {
        return new (ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE))(streamMessage)
    }

    static deserialize(messageVersion, broadcastMessageSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(C.getConstructorArgs(broadcastMessageSpecificArgsArray))
    }
}

/* static */ BroadcastMessage.TYPE = TYPE
ControlMessage.registerFactory(BroadcastMessage.TYPE, BroadcastMessage)
