import ControlMessage from '../ControlMessage'
import { validateIsType } from '../../../utils/validations'
import StreamMessage from '../../message_layer/StreamMessage'

const TYPE = 0

export default class BroadcastMessage extends ControlMessage {
    constructor(version, requestId, streamMessage) {
        super(version, TYPE, requestId)

        validateIsType('streamMessage', streamMessage, 'StreamMessage', StreamMessage)
        this.streamMessage = streamMessage
    }

    static create(requestId, streamMessage) {
        return new BroadcastMessage(ControlMessage.LATEST_VERSION, requestId, streamMessage)
    }
}

/* static */
BroadcastMessage.TYPE = TYPE
