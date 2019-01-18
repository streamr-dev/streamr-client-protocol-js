import ControlMessage from '../ControlMessage'
import StreamAndPartition from '../StreamAndPartition'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 2

export default class SubscribeResponse extends ControlMessage {
    constructor(version) {
        super(version, TYPE)
    }

    static create(streamId, streamPartition) {
        return new (ControlMessage.getV1Class(TYPE))(streamId, streamPartition)
    }

    static deserialize(messageVersion, subscribeResponseSpecificArgsArray) {
        if (messageVersion === 0) {
            const streamPartitionObject = subscribeResponseSpecificArgsArray[1] // index 0 is the null subId
            const payload = StreamAndPartition.deserialize(streamPartitionObject)
            return new (ControlMessage.getV0Class(TYPE))(payload.streamId, payload.streamPartition)
        } else if (messageVersion === 1) {
            return new (ControlMessage.getV1Class(TYPE))(...subscribeResponseSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ SubscribeResponse.TYPE = TYPE
