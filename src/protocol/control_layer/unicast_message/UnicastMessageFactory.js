import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnicastMessageV0 from './UnicastMessageV0'
import UnicastMessageV1 from './UnicastMessageV1'

export default class UnicastMessageFactory {
    static deserialize(messageVersion, unicastMessageSpecificArgsArray) {
        if (messageVersion === 0) {
            const streamMessageArray = unicastMessageSpecificArgsArray[0]
            return new UnicastMessageV0(StreamMessageFactory.deserialize(streamMessageArray), ...unicastMessageSpecificArgsArray.slice(1))
        } else if (messageVersion === 1) {
            return new UnicastMessageV1(...unicastMessageSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
