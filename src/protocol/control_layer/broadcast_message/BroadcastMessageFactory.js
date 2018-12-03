import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import BroadcastMessageV0 from './BroadcastMessageV0'
import BroadcastMessageV1 from './BroadcastMessageV1'

export default class BroadcastMessageFactory {
    static deserialize(messageVersion, broadcastMessageSpecificArgsArray) {
        if (messageVersion === 0) {
            const streamMessageArray = broadcastMessageSpecificArgsArray[0]
            return new BroadcastMessageV0(StreamMessageFactory.deserialize(streamMessageArray))
        } else if (messageVersion === 1) {
            return new BroadcastMessageV1(...broadcastMessageSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
