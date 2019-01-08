import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import PublishRequestV1 from './PublishRequestV1'

export default class PublishRequestFactory {
    static deserialize(messageVersion, publishRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and PublishRequestV0.
        if (messageVersion === 1) {
            const streamMsgArgsArray = publishRequestSpecificArgsArray[0]
            return new PublishRequestV1(StreamMessageFactory.deserialize(streamMsgArgsArray), publishRequestSpecificArgsArray[1])
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}
