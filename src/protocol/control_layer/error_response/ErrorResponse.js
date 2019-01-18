import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import ErrorPayload from './ErrorPayload'

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
        if (messageVersion === 0) {
            const errorObject = errorResponseSpecificArgsArray[1] // index 0 is the null subId
            const payload = ErrorPayload.deserialize(errorObject)
            return new (ControlMessage.getClass(0, TYPE))(payload.error)
        } else if (messageVersion === 1) {
            return new (ControlMessage.getClass(1, TYPE))(...errorResponseSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ ErrorResponse.TYPE = TYPE
