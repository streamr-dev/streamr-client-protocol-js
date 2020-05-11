import ControlMessage from '../ControlMessage'

import SubscribeRequest from './SubscribeRequest'

const VERSION = 1

export default class SubscribeRequestSerializerV1 {

    toArray(subscribeRequest) {
        return [
            VERSION,
            SubscribeRequest.TYPE,
            subscribeRequest.streamId,
            subscribeRequest.streamPartition,
            subscribeRequest.sessionToken,
        ]
    }

    fromArray(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
            sessionToken,
        ] = arr

        return new SubscribeRequest(version, null, streamId, streamPartition, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, SubscribeRequest.TYPE, SubscribeRequestSerializerV1)
