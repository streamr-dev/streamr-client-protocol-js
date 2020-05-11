import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import ControlMessage from '../ControlMessage'
import BroadcastMessage from '../broadcast_message/BroadcastMessage'
import PublishRequest from './PublishRequest'

const VERSION = 1

export default class PublishRequestSerializerV2 {

    static toArray(publishRequest) {
        return [
            VERSION,
            BroadcastMessage.TYPE,
            publishRequest.requestId,
            publishRequest.streamMessage.serialize(),
            publishRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            serializedStreamMsg,
            sessionToken,
        ] = arr

        return new PublishRequest(version, requestId, StreamMessageFactory.deserialize(serializedStreamMsg), sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, PublishRequest.TYPE, PublishRequestSerializerV2)
