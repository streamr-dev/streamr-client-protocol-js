import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 8

export default class PublishRequest extends ControlMessage {
    constructor(version, sessionToken) {
        if (new.target === PublishRequest) {
            throw new TypeError('PublishRequest is abstract.')
        }
        super(version, TYPE)
        this.sessionToken = sessionToken
    }

    static create(streamMessage, sessionToken) {
        return new (ControlMessage.getClass(1, TYPE))(streamMessage, sessionToken)
    }

    static deserialize(messageVersion, publishRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and PublishRequestV0.
        if (messageVersion === 1) {
            const streamMsgArgsArray = publishRequestSpecificArgsArray[0]
            return new (ControlMessage.getClass(1, TYPE))(StreamMessageFactory.deserialize(streamMsgArgsArray), publishRequestSpecificArgsArray[1])
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}

/* static */ PublishRequest.TYPE = TYPE
