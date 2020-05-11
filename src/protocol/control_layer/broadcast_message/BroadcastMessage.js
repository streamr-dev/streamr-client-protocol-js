import ControlMessage from '../ControlMessage'
import { validateIsNotNullOrUndefined } from '../../../utils/validations'

const TYPE = 0

export default class BroadcastMessage extends ControlMessage {
    constructor(version, requestId, streamMessage) {
        super(version, TYPE, requestId)

        validateIsNotNullOrUndefined('streamMessage', streamMessage)
        this.streamMessage = streamMessage
    }

    static create(...args) {
        return new BroadcastMessage(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */
BroadcastMessage.TYPE = TYPE
