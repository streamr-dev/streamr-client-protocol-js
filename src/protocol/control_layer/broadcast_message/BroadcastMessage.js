import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

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
        if (messageVersion === 0) {
            const streamMessageArray = broadcastMessageSpecificArgsArray[1] // index 0 is the null subId
            return new (ControlMessage.getClass(0, TYPE))(StreamMessageFactory.deserialize(streamMessageArray))
        } else if (messageVersion === 1) {
            const streamMessageArray = broadcastMessageSpecificArgsArray[0]
            return new (ControlMessage.getClass(1, TYPE))(StreamMessageFactory.deserialize(streamMessageArray))
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ BroadcastMessage.TYPE = TYPE
