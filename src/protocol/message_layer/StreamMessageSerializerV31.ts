// @ts-nocheck
import StreamMessage from './StreamMessage'
import MessageRef from './MessageRef'
import MessageIDStrict from './MessageIDStrict'

const VERSION = 31

export default class StreamMessageSerializerV31 {
    static toArray(streamMessage) {
        return [
            VERSION,
            streamMessage.messageId.toArray(),
            streamMessage.prevMsgRef ? streamMessage.prevMsgRef.toArray() : null,
            streamMessage.messageType,
            streamMessage.encryptionType,
            streamMessage.serializedContent,
            streamMessage.signatureType,
            streamMessage.signature,
        ]
    }

    static fromArray(arr) {
        const [
            version, // eslint-disable-line no-unused-vars
            messageIdArr,
            prevMsgRefArr,
            messageType,
            encryptionType,
            serializedContent,
            signatureType,
            signature,
        ] = arr

        return new StreamMessage({
            messageId: MessageIDStrict.fromArray(messageIdArr),
            prevMsgRef: prevMsgRefArr ? MessageRef.fromArray(prevMsgRefArr) : null,
            content: serializedContent,
            messageType,
            contentType: StreamMessage.CONTENT_TYPES.JSON,
            encryptionType,
            signatureType,
            signature,
        })
    }
}

StreamMessage.registerSerializer(VERSION, StreamMessageSerializerV31)
