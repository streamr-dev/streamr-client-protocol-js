import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

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
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(publishRequestSpecificArgsArray))
    }
}

/* static */ PublishRequest.TYPE = TYPE
ControlMessageFactory.registerFactory(PublishRequest.TYPE, PublishRequest)
ControlMessageFactory.registerFactory('publish', PublishRequest) // for version 0
