import { validateIsNotEmptyString, validateIsNotNullOrUndefined, validateIsType } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

const TYPE = 1

export default class UnicastMessage extends ControlMessage {
    constructor(version, requestId, streamMessage) {
        super(version, TYPE, requestId)

        validateIsType('streamMessage', streamMessage, 'StreamMessage', StreamMessage)
        this.streamMessage = streamMessage

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }

    static create(requestId, streamMessage) {
        return new UnicastMessage(ControlMessage.LATEST_VERSION, requestId, streamMessage)
    }
}

/* static */
UnicastMessage.TYPE = TYPE
