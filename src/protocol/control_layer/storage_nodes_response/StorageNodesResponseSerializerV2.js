import ControlMessage from '../ControlMessage'

import StorageNodesResponse from './StorageNodesResponse'

const VERSION = 2

export default class StorageNodesResponseSerializerV2 {
    static toArray(storageNodesResponse) {
        return [
            VERSION,
            ControlMessage.TYPES.StorageNodesResponse,
            storageNodesResponse.requestId,
            storageNodesResponse.streamId,
            storageNodesResponse.streamPartition,
            storageNodesResponse.nodeAddresses
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            nodeAddresses
        ] = arr

        return new StorageNodesResponse({
            version, requestId, streamId, streamPartition, nodeAddresses
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.StorageNodesResponse, StorageNodesResponseSerializerV2)
