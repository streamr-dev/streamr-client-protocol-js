import ControlMessage from '../ControlMessage'

import SubscribeResponse from './SubscribeResponse'

const VERSION = 1

export default class SubscribeResponseSerializerV1 {
    static toArray(subscribeResponse) {
        return [
            VERSION,
            SubscribeResponse.TYPE,
            subscribeResponse.streamId,
            subscribeResponse.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
        ] = arr

        return new SubscribeResponse(version, null, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, SubscribeResponse.TYPE, SubscribeResponseSerializerV1)
