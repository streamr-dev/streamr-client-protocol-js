import ControlMessage from '../ControlMessage'
import { validateIsString } from '../../../utils/validations'

const TYPE = 7

export default class ErrorResponse extends ControlMessage {
    constructor(version, requestId, errorMessage, errorCode) {
        super(version, TYPE, requestId)

        validateIsString('errorMessage', errorMessage)
        this.errorMessage = errorMessage

        // Since V2
        if (version >= 2) {
            validateIsString('errorCode', errorCode)
            this.errorCode = errorCode
        }
    }

    static create(requestId, errorMessage, errorCode) {
        return new ErrorResponse(ControlMessage.LATEST_VERSION, requestId, errorMessage, errorCode)
    }
}

/* static */ ErrorResponse.TYPE = TYPE
