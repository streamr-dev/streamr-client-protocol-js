import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

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
        return new (ControlMessage.getClass(1, TYPE))(streamMessage)
    }

    static deserialize(messageVersion, broadcastMessageSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(C.getConstructorArgs(broadcastMessageSpecificArgsArray))
    }
}

/* static */ BroadcastMessage.TYPE = TYPE
ControlMessageFactory.registerFactory(BroadcastMessage.TYPE, BroadcastMessage)
