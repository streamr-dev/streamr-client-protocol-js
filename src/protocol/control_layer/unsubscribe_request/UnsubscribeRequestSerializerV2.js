import ControlMessage from '../ControlMessage'

import UnsubscribeRequest from './UnsubscribeRequest'

const VERSION = 2

export default class UnsubscribeRequestSerializerV2 {
    static toArray(unsubscribeRequest) {
        return [
            VERSION,
            UnsubscribeRequest.TYPE,
            unsubscribeRequest.requestId,
            unsubscribeRequest.streamId,
            unsubscribeRequest.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeRequest(version, requestId, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, UnsubscribeRequest.TYPE, UnsubscribeRequestSerializerV2)
