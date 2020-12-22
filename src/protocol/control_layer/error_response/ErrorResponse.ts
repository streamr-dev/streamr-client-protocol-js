import ControlMessage from '../ControlMessage'
import { validateIsString } from '../../../utils/validations'

export default class ErrorResponse extends ControlMessage {

    errorMessage: string
    errorCode: string | undefined
    
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, errorMessage, errorCode }: { version?: number, requestId: string, errorMessage: string, errorCode?: string }) {
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
