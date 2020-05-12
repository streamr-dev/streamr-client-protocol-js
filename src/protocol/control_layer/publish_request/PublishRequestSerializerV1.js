import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import PublishRequest from './PublishRequest'

const VERSION = 1

export default class PublishRequestSerializerV1 {
    static toArray(publishRequest, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            PublishRequest.TYPE,
            StreamMessage.getSerializer(streamMessageVersion).toArray(publishRequest.streamMessage),
            publishRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            serializedStreamMsg,
            sessionToken,
        ] = arr

        return new PublishRequest(version, null, StreamMessage.deserialize(serializedStreamMsg), sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, PublishRequest.TYPE, PublishRequestSerializerV1)
