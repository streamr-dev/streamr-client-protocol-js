import { validateIsNotEmptyString, validateIsNotNullOrUndefined } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

const TYPE = 1

export default class UnicastMessage extends ControlMessage {
    constructor(version, requestId, streamMessage) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
        this.requestId = requestId // unnecessary line once V1 is dropped

        validateIsNotNullOrUndefined('streamMessage', streamMessage)
        this.streamMessage = streamMessage
    }

    static create(...args) {
        new UnicastMessage(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */
UnicastMessage.TYPE = TYPE
