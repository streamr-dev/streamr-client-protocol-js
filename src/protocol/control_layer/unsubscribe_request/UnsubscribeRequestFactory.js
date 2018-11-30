import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnSubscribeRequestV1 from './UnsubscribeRequestV1'

export default class UnsubscribeRequestFactory {
    static deserialize(messageVersion, unsubscribeRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and UnsubscribeRequestV0.
        if (messageVersion === 1) {
            return new UnSubscribeRequestV1(...unsubscribeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}
