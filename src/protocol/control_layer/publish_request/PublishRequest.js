import ControlMessage from '../ControlMessage'

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
        return new (ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE))(streamMessage, sessionToken)
    }

    static deserialize(messageVersion, publishRequestSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(publishRequestSpecificArgsArray))
    }
}

/* static */ PublishRequest.TYPE = TYPE
