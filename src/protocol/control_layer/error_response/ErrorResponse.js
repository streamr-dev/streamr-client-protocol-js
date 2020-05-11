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

    static create(...args) {
        return new ErrorResponse(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */ ErrorResponse.TYPE = TYPE
