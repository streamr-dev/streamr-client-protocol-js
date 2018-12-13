import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamAndPartition from '../StreamAndPartition'
import UnsubscribeResponseV0 from './UnsubscribeResponseV0'
import UnsubscribeResponseV1 from './UnsubscribeResponseV1'

export default class UnsubscribeResponseFactory {
    static deserialize(messageVersion, subscribeResponseSpecificArgsArray) {
        if (messageVersion === 0) {
            const streamPartitionObject = subscribeResponseSpecificArgsArray[1] // index 0 is the null subId
            const payload = StreamAndPartition.deserialize(streamPartitionObject)
            return new UnsubscribeResponseV0(payload.streamId, payload.streamPartition)
        } else if (messageVersion === 1) {
            return new UnsubscribeResponseV1(...subscribeResponseSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
