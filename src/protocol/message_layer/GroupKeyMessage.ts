import { Todo } from '../../sharedTypes'
import { validateIsString } from '../../utils/validations'

import StreamMessage from './StreamMessage'

export default class GroupKeyMessage {

    streamId: string
    messageType: Todo

    constructor(streamId: string, messageType: Todo) {
        validateIsString('streamId', streamId)
        this.streamId = streamId

        StreamMessage.validateMessageType(messageType)
        this.messageType = messageType
    }

    serialize() {
        // @ts-ignore TODO bug?
        return JSON.stringify(this.toArray())
    }

    static deserialize(serialized: Todo, messageType: Todo) {
        // @ts-ignore TODO static
        if (!GroupKeyMessage.classByMessageType[messageType]) {
            throw new Error(`Unknown MessageType: ${messageType}`)
        }
        // @ts-ignore TODO static
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
}

// @ts-ignore TODO static
GroupKeyMessage.classByMessageType = {}
