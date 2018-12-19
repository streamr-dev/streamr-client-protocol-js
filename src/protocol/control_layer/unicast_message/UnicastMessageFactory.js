import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnicastMessageV0 from './UnicastMessageV0'
import UnicastMessageV1 from './UnicastMessageV1'

export default class UnicastMessageFactory {
    static deserialize(messageVersion, unicastMessageSpecificArgsArray) {
        if (messageVersion === 0) {
            const subId = unicastMessageSpecificArgsArray[0]
            const streamMessageArray = unicastMessageSpecificArgsArray[1]
            const streamMessage = StreamMessageFactory.deserialize(streamMessageArray)
            return new UnicastMessageV0(streamMessage, subId)
        } else if (messageVersion === 1) {
            const subId = unicastMessageSpecificArgsArray[0]
            const streamMessageArray = unicastMessageSpecificArgsArray[1]
            const streamMessage = StreamMessageFactory.deserialize(streamMessageArray)
            return new UnicastMessageV1(subId, streamMessage)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
