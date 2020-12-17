import TrackerMessage from '../TrackerMessage'

import StorageNodesRequest from './StorageNodesRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class StorageNodesRequestSerializerV1 extends Serializer<Todo> {
    toArray(storageNodesRequest: Todo) {
        return [
            VERSION,
            TrackerMessage.TYPES.StorageNodesRequest,
            storageNodesRequest.requestId,
            storageNodesRequest.streamId,
            storageNodesRequest.streamPartition,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new StorageNodesRequest({
            version, requestId, streamId, streamPartition
        })
    }
}

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.StorageNodesRequest, new StorageNodesRequestSerializerV1())
