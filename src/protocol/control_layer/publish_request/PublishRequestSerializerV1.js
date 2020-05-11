import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import PublishRequest from './PublishRequest'

const VERSION = 1

export default class PublishRequestSerializerV1 {
    static toArray(publishRequest, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            PublishRequest.TYPE,
            // TODO: use StreamMessage.getSerializer(streamMessageVersion).toArray() once refactored
            JSON.parse(publishRequest.streamMessage.serialize(streamMessageVersion)),
            publishRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            serializedStreamMsg,
            sessionToken,
        ] = arr

        return new PublishRequest(version, null, StreamMessageFactory.deserialize(serializedStreamMsg), sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, PublishRequest.TYPE, PublishRequestSerializerV1)
