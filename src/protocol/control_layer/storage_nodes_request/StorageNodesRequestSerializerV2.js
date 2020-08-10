import ControlMessage from '../ControlMessage'

import StorageNodesRequest from './StorageNodesRequest'

const VERSION = 2

export default class StorageNodesRequestSerializerV2 {
    static toArray(storageNodesRequest) {
        return [
            VERSION,
            ControlMessage.TYPES.StorageNodesRequest,
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

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.StorageNodesRequest, StorageNodesRequestSerializerV2)
