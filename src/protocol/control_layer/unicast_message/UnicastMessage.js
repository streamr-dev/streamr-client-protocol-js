import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 1

class UnicastMessage extends ControlMessage {
    constructor(version, subId) {
        if (new.target === UnicastMessage) {
            throw new TypeError('UnicastMessage is abstract.')
        }
        super(version, TYPE)
        this.subId = subId
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.subId,
        ])
        return array
    }

    serialize(version = this.version, messageLayerVersion) {
        if (version === this.version) {
            return JSON.stringify(this.toArray(messageLayerVersion))
        }
        return this.toOtherVersion(version, messageLayerVersion).serialize()
    }

    static create(subId, streamMessage) {
        const C = ControlMessage.getClass(1, TYPE)
        return new C(subId, streamMessage)
    }

    static deserialize(messageVersion, unicastMessageSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(unicastMessageSpecificArgsArray))
    }
}
module.exports = UnicastMessage
/* static */ UnicastMessage.TYPE = TYPE
ControlMessageFactory.registerFactory(UnicastMessage.TYPE, UnicastMessage)
