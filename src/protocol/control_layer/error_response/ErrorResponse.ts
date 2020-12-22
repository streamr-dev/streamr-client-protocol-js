import ControlMessage, { ControlMessageOptions } from '../ControlMessage'
import { validateIsString } from '../../../utils/validations'

export interface Options extends ControlMessageOptions {
    errorMessage: string
    errorCode?: string
}

export default class ErrorResponse extends ControlMessage {

    errorMessage: string
    errorCode: string | undefined
    
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, errorMessage, errorCode }: Options) {
        super(version, ControlMessage.TYPES.ErrorResponse, requestId)

        validateIsString('errorMessage', errorMessage)
        this.errorMessage = errorMessage

        // Since V2
        if (version >= 2) {
            validateIsString('errorCode', errorCode)
            this.errorCode = errorCode
        }
    }
}
