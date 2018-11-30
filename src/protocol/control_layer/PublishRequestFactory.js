import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import PublishRequestV1 from './PublishRequestV1'

export default class PublishRequestFactory {
    static deserialize(messageVersion, publishRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and PublishRequestV0.
        if (messageVersion === 1) {
            return new PublishRequestV1(...publishRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
