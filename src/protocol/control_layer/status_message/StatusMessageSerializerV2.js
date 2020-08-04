import ControlMessage from '../ControlMessage'

import StatusMessage from './StatusMessage'

const VERSION = 2

export default class StatusMessageSerializerV2 {
    static toArray(statusMessage) {
        return [
            VERSION,
            ControlMessage.TYPES.StatusMessage,
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

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.StatusMessage, StatusMessageSerializerV2)
