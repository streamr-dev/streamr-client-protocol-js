import ControlMessage from '../ControlMessage'

const TYPE = 7

export default class ErrorResponse extends ControlMessage {
    constructor(version) {
        if (new.target === ErrorResponse) {
            throw new TypeError('ErrorResponse is abstract.')
        }
        super(version, TYPE)
    }

    static create(errorMessage) {
        return new (ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE))(errorMessage)
    }

    static deserialize(messageVersion, errorResponseSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(errorResponseSpecificArgsArray))
    }
}

/* static */ ErrorResponse.TYPE = TYPE
ControlMessage.registerFactory(ErrorResponse.TYPE, ErrorResponse)
