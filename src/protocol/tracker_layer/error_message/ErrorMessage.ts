import { Todo } from '../../../sharedTypes'
import {
    validateIsOneOf,
    validateIsNotEmptyString,
} from '../../../utils/validations'
import TrackerMessage from '../TrackerMessage'

const ERROR_CODES = Object.freeze({
    RTC_UNKNOWN_PEER: 'RTC_UNKNOWN_PEER'
})

export default class ErrorMessage extends TrackerMessage {
    
    static ERROR_CODES = ERROR_CODES

    errorCode: Todo
    targetNode: string

    constructor({ version = TrackerMessage.LATEST_VERSION, requestId, errorCode, targetNode }: Todo) {
        super(version, TrackerMessage.TYPES.ErrorMessage, requestId)

        validateIsOneOf('errorCode', errorCode, Object.values(ERROR_CODES))
        validateIsNotEmptyString('targetNode', targetNode)

        this.errorCode = errorCode
        this.targetNode = targetNode
    }
}
