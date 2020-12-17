import ControlMessage from '../ControlMessage'
import { validateIsNotNullOrUndefined, validateIsString } from '../../../utils/validations'
import { Todo } from '../../../sharedTypes'

export default class PublishRequest extends ControlMessage {

    streamMessage: Todo
    sessionToken: string | undefined | null

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamMessage, sessionToken }: Todo) {
        super(version, ControlMessage.TYPES.PublishRequest, requestId)

        validateIsNotNullOrUndefined('streamMessage', streamMessage)
        this.streamMessage = streamMessage

        validateIsString('sessionToken', sessionToken, true)
        this.sessionToken = sessionToken
    }
}
