import StorageNodesResponse from './StorageNodesResponse'
import TrackerMessage from "../TrackerMessage";

const VERSION = 1

export default class StorageNodesResponseSerializerV2 {
    static toArray(storageNodesResponse) {
        return [
            VERSION,
            TrackerMessage.TYPES.StorageNodesResponse,
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

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.StorageNodesResponse, StorageNodesResponseSerializerV2)
