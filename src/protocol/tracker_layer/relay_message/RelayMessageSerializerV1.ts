// @ts-nocheck
import TrackerMessage from '../TrackerMessage'

import RelayMessage from './RelayMessage'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class RelayMessageSerializerV1 extends Serializer<Todo> {
    toArray(relayMessage: Todo) {
        return [
            VERSION,
            TrackerMessage.TYPES.RelayMessage,
            relayMessage.requestId,
            relayMessage.originator,
            relayMessage.targetNode,
            relayMessage.subType,
            relayMessage.data
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            originator,
            targetNode,
            subType,
            data
        ] = arr

        return new RelayMessage({
            version, requestId, originator, targetNode, subType, data
        })
    }
}

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.RelayMessage, new RelayMessageSerializerV1())
