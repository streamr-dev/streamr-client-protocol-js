import ControlMessage from '../ControlMessage'
import { validateIsNotNullOrUndefined, validateIsString } from '../../../utils/validations'
import StreamMessage from '../../message_layer/StreamMessage'

export default class PublishRequest extends ControlMessage {

    streamMessage: StreamMessage
    sessionToken: string | null

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamMessage, sessionToken }: { version?: number, requestId: string, streamMessage: StreamMessage, sessionToken: string | null}) {
        super(version, ControlMessage.TYPES.PublishRequest, requestId)

        validateIsNotNullOrUndefined('streamMessage', streamMessage)
        this.streamMessage = streamMessage

        validateIsString('sessionToken', sessionToken, true)
        this.sessionToken = sessionToken
    }
}
