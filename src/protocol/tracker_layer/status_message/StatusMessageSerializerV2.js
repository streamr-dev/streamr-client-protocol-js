import StatusMessage from './StatusMessage'
import TrackerMessage from "../TrackerMessage";

const VERSION = 1

export default class StatusMessageSerializerV2 {
    static toArray(statusMessage) {
        return [
            VERSION,
            TrackerMessage.TYPES.StatusMessage,
            statusMessage.requestId,
            statusMessage.status
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            status
        ] = arr

        return new StatusMessage({
            version, requestId, status
        })
    }
}

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.StatusMessage, StatusMessageSerializerV2)
