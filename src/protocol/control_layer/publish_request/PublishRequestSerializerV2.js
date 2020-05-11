import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import PublishRequest from './PublishRequest'

const VERSION = 2

export default class PublishRequestSerializerV2 {
    static toArray(publishRequest, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            PublishRequest.TYPE,
            publishRequest.requestId,
            // TODO: use StreamMessage.getSerializer(streamMessageVersion).toArray() once refactored
            JSON.parse(publishRequest.streamMessage.serialize(streamMessageVersion)),
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
