import { Todo } from '../../sharedTypes'
import { validateIsString } from '../../utils/validations'

import StreamMessage from './StreamMessage'

export default abstract class GroupKeyMessage {

    static classByMessageType: Todo = {}

    streamId: string
    messageType: Todo

    constructor(streamId: string, messageType: Todo) {
        validateIsString('streamId', streamId)
        this.streamId = streamId

        StreamMessage.validateMessageType(messageType)
        this.messageType = messageType
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }

    static deserialize(serialized: Todo, messageType: Todo) {
        if (!GroupKeyMessage.classByMessageType[messageType]) {
            throw new Error(`Unknown MessageType: ${messageType}`)
        }
        return GroupKeyMessage.classByMessageType[messageType].fromArray(JSON.parse(serialized))
    }

    static fromStreamMessage(streamMessage: Todo) {
        return GroupKeyMessage.deserialize(streamMessage.getSerializedContent(), streamMessage.messageType)
    }

    toStreamMessage(messageId: Todo, prevMsgRef: Todo) {
        return new StreamMessage({
            messageId,
            prevMsgRef,
            content: this.serialize(),
            messageType: this.messageType,
        })
    }

    abstract toArray(): Todo
}
