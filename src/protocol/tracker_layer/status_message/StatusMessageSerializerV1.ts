// @ts-nocheck
import TrackerMessage from '../TrackerMessage'

import StatusMessage from './StatusMessage'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class StatusMessageSerializerV1 extends Serializer<Todo> {
    toArray(statusMessage: Todo) {
        return [
            VERSION,
            TrackerMessage.TYPES.StatusMessage,
            statusMessage.requestId,
            statusMessage.status
        ]
    }

    fromArray(arr: Todo) {
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

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.StatusMessage, new StatusMessageSerializerV1())
