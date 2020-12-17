import { validateIsNotEmptyString, validateIsType } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'
import { Todo } from '../../../sharedTypes'

export default class UnicastMessage extends ControlMessage {

    streamMessage: Todo

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamMessage }: Todo) {
        super(version, ControlMessage.TYPES.UnicastMessage, requestId)

        validateIsType('streamMessage', streamMessage, 'StreamMessage', StreamMessage)
        this.streamMessage = streamMessage

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }
}
