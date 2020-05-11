import ControlMessage from '../ControlMessage'
import UnsubscribeRequest from './UnsubscribeRequest'

const VERSION = 1

export default class UnsubscribeRequestSerializerV1 {

    static toArray(unsubscribeRequest) {
        return [
            VERSION,
            UnsubscribeRequest.TYPE,
            unsubscribeRequest.streamId,
            unsubscribeRequest.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeRequest(version, null, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, UnsubscribeRequest.TYPE, UnsubscribeRequestSerializerV1)
