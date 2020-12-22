import {
    validateIsOneOf,
    validateIsNotEmptyString,
} from '../../../utils/validations'
import TrackerMessage, { TrackerMessageOptions } from '../TrackerMessage'

type ErrorCode = string

// TODO convert to real enum?
const ERROR_CODES = Object.freeze({
    RTC_UNKNOWN_PEER: 'RTC_UNKNOWN_PEER' as ErrorCode
})

export interface Options extends TrackerMessageOptions {
    errorCode: ErrorCode
    targetNode: string
}

export default class ErrorMessage extends TrackerMessage {
    
    static ERROR_CODES = ERROR_CODES

    errorCode: ErrorCode
    targetNode: string

    constructor({ version = TrackerMessage.LATEST_VERSION, requestId, errorCode, targetNode }: Options) {
        super(version, TrackerMessage.TYPES.ErrorMessage, requestId)

        validateIsOneOf('errorCode', errorCode, Object.values(ERROR_CODES))
        validateIsNotEmptyString('targetNode', targetNode)

        this.errorCode = errorCode
        this.targetNode = targetNode
    }
}
