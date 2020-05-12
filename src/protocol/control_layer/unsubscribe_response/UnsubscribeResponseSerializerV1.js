import ControlMessage from '../ControlMessage'

import UnsubscribeResponse from './UnsubscribeResponse'

const VERSION = 1

export default class UnsubscribeResponseSerializerV1 {
    static toArray(unsubscribeResponse) {
        return [
            VERSION,
            UnsubscribeResponse.TYPE,
            unsubscribeResponse.streamId,
            unsubscribeResponse.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeResponse(version, null, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, UnsubscribeResponse.TYPE, UnsubscribeResponseSerializerV1)
