import ControlMessage from '../ControlMessage'

import StorageNodesMessage from './StorageNodesMessage'

const VERSION = 2

export default class StorageNodesMessageSerializerV2 {
    static toArray(storageNodesMessage) {
        return [
            VERSION,
            ControlMessage.TYPES.StorageNodesMessage,
            storageNodesMessage.requestId,
            storageNodesMessage.streamId,
            storageNodesMessage.streamPartition,
            storageNodesMessage.nodeAddresses
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

        return new StorageNodesMessage({
            version, requestId, streamId, streamPartition, nodeAddresses
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.StorageNodesMessage, StorageNodesMessageSerializerV2)
