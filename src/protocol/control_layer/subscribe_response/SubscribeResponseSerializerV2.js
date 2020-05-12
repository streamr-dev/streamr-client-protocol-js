import ControlMessage from '../ControlMessage'

import SubscribeResponse from './SubscribeResponse'

const VERSION = 2

export default class SubscribeResponseSerializerV2 {
    static toArray(subscribeResponse) {
        return [
            VERSION,
            SubscribeResponse.TYPE,
            subscribeResponse.requestId,
            subscribeResponse.streamId,
            subscribeResponse.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new SubscribeResponse(version, requestId, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, SubscribeResponse.TYPE, SubscribeResponseSerializerV2)
