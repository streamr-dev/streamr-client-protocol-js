import { Todo } from '../../sharedTypes'
import { validateIsString } from '../../utils/validations'

import StreamMessage, { StreamMessageType } from './StreamMessage'

export default abstract class GroupKeyMessage {

    static classByMessageType: { [key: number]: Todo } = {}  // TODO replace "number" with real enum?

    streamId: string
    messageType: StreamMessageType

    constructor(streamId: string, messageType: StreamMessageType) {
        validateIsString('streamId', streamId)
        this.streamId = streamId

        StreamMessage.validateMessageType(messageType)
        this.messageType = messageType
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }

    static deserialize(serialized: Todo, messageType: StreamMessageType) {
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
