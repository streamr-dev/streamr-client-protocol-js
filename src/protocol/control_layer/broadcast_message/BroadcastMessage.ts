import ControlMessage, { ControlMessageOptions } from '../ControlMessage'
import { validateIsType } from '../../../utils/validations'
import StreamMessage from '../../message_layer/StreamMessage'
import { formLogFriendlyString } from "../../helpers"

export interface Options extends ControlMessageOptions {
    streamMessage: StreamMessage
}

export default class BroadcastMessage extends ControlMessage {

    streamMessage: StreamMessage

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamMessage }: Options) {
        super(version, ControlMessage.TYPES.BroadcastMessage, requestId)

        validateIsType('streamMessage', streamMessage, 'StreamMessage', StreamMessage)
        this.streamMessage = streamMessage
    }


    toString(): string {
        return formLogFriendlyString(
            this.constructor.name, false,
            'requestId', this.requestId,
            'streamMessage', this.streamMessage
        )
    }
}
