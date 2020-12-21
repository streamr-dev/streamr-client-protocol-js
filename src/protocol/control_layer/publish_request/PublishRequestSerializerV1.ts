import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import PublishRequest from './PublishRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class PublishRequestSerializerV1 extends Serializer<PublishRequest> {
    toArray(publishRequest: PublishRequest, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            ControlMessage.TYPES.PublishRequest,
            StreamMessage.getSerializer(streamMessageVersion).toArray(publishRequest.streamMessage),
            publishRequest.sessionToken,
        ]
    }

    fromArray(arr: any) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            serializedStreamMsg,
            sessionToken,
        ] = arr

        return new PublishRequest({
            version,
            streamMessage: StreamMessage.deserialize(serializedStreamMsg),
            sessionToken,
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.PublishRequest, new PublishRequestSerializerV1())
