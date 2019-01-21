import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 7

export default class ErrorResponse extends ControlMessage {
    constructor(version) {
        if (new.target === ErrorResponse) {
            throw new TypeError('ErrorResponse is abstract.')
        }
        super(version, TYPE)
    }

    static create(errorMessage) {
        return new (ControlMessage.getClass(1, TYPE))(errorMessage)
    }

    static deserialize(messageVersion, errorResponseSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(errorResponseSpecificArgsArray))
    }
}

/* static */ ErrorResponse.TYPE = TYPE
ControlMessageFactory.registerFactory(ErrorResponse.TYPE, ErrorResponse)
