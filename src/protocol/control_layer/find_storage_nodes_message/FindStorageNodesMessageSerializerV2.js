import ControlMessage from '../ControlMessage'

import FindStorageNodesMessage from './FindStorageNodesMessage'

const VERSION = 2

export default class FindStorageNodesMessageSerializerV2 {
    static toArray(findStorageNodesMessage) {
        return [
            VERSION,
            ControlMessage.TYPES.FindStorageNodesMessage,
            findStorageNodesMessage.requestId,
            findStorageNodesMessage.streamId,
            findStorageNodesMessage.streamPartition,
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

        return new FindStorageNodesMessage({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.FindStorageNodesMessage, FindStorageNodesMessageSerializerV2)
