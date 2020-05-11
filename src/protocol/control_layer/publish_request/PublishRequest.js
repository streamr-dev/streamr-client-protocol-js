import ControlMessage from '../ControlMessage'
import { validateIsNotNullOrUndefined, validateIsString } from '../../../utils/validations'

const TYPE = 8

export default class PublishRequest extends ControlMessage {
    constructor(version, requestId, streamMessage, sessionToken) {
        super(version, TYPE, requestId)

        validateIsNotNullOrUndefined('streamMessage', streamMessage)
        this.streamMessage = streamMessage

        validateIsString('sessionToken', sessionToken, true)
        this.sessionToken = sessionToken
    }

    static create(...args) {
        return new PublishRequest(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */
PublishRequest.TYPE = TYPE
