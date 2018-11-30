import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import SubscribeRequestV1 from './SubscribeRequestV1'

export default class SubscribeRequestFactory {
    static deserialize(messageVersion, subscribeRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and SubscribeRequestV0.
        if (messageVersion === 1) {
            return new SubscribeRequestV1(...subscribeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}
