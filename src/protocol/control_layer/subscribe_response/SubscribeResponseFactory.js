import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamAndPartition from '../../StreamAndPartition'
import SubscribeResponseV0 from './SubscribeResponseV0'
import SubscribeResponseV1 from './SubscribeResponseV1'

export default class SubscribeResponseFactory {
    static deserialize(messageVersion, subscribeResponseSpecificArgsArray) {
        if (messageVersion === 0) {
            const streamPartitionObject = subscribeResponseSpecificArgsArray[1] // index 0 is the null subId
            const payload = StreamAndPartition.deserialize(streamPartitionObject)
            return new SubscribeResponseV0(payload.streamId, payload.streamPartition)
        } else if (messageVersion === 1) {
            return new SubscribeResponseV1(...subscribeResponseSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
