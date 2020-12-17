import ControlMessage from '../ControlMessage'
import { validateIsType } from '../../../utils/validations'
import StreamMessage from '../../message_layer/StreamMessage'
import { Todo } from '../../../sharedTypes'

export default class BroadcastMessage extends ControlMessage {

    streamMessage: Todo

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamMessage }: Todo) {
        super(version, ControlMessage.TYPES.BroadcastMessage, requestId)

        validateIsType('streamMessage', streamMessage, 'StreamMessage', StreamMessage)
        this.streamMessage = streamMessage
    }
}
