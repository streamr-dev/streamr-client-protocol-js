import TrackerMessage from '../TrackerMessage'

import StorageNodesRequest from './StorageNodesRequest'

const VERSION = 1

export default class StorageNodesRequestSerializerV2 {
    static toArray(storageNodesRequest) {
        return [
            VERSION,
            TrackerMessage.TYPES.StorageNodesRequest,
            storageNodesRequest.requestId,
            storageNodesRequest.streamId,
            storageNodesRequest.streamPartition,
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

        return new StorageNodesRequest({
            version, requestId, streamId, streamPartition
        })
    }
}

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.StorageNodesRequest, StorageNodesRequestSerializerV2)
