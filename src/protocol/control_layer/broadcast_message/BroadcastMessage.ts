import ControlMessage from '../ControlMessage'
import { validateIsType } from '../../../utils/validations'
import StreamMessage from '../../message_layer/StreamMessage'

export default class BroadcastMessage extends ControlMessage {

    streamMessage: StreamMessage

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamMessage }: { version?: number, requestId?: string, streamMessage: StreamMessage}) {
        super(version, ControlMessage.TYPES.BroadcastMessage, requestId)

        validateIsType('streamMessage', streamMessage, 'StreamMessage', StreamMessage)
        this.streamMessage = streamMessage
    }
}
