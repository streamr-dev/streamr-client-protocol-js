import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 1

export default class UnicastMessage extends ControlMessage {
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
        return new (ControlMessage.getV1Class(TYPE))(subId, streamMessage)
    }

    static deserialize(messageVersion, unicastMessageSpecificArgsArray) {
        if (messageVersion === 0) {
            const subId = unicastMessageSpecificArgsArray[0]
            const streamMessageArray = unicastMessageSpecificArgsArray[1]
            const streamMessage = StreamMessageFactory.deserialize(streamMessageArray)
            return new (ControlMessage.getV0Class(TYPE))(streamMessage, subId)
        } else if (messageVersion === 1) {
            const subId = unicastMessageSpecificArgsArray[0]
            const streamMessageArray = unicastMessageSpecificArgsArray[1]
            const streamMessage = StreamMessageFactory.deserialize(streamMessageArray)
            return new (ControlMessage.getV1Class(TYPE))(subId, streamMessage)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ UnicastMessage.TYPE = TYPE

module.exports = UnicastMessage
