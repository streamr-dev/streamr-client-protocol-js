import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendLastRequestV1 from './ResendLastRequestV1'

export default class ResendLastRequestFactory {
    static deserialize(messageVersion, resendLastRequestSpecificArgsArray) {
        // No Version 0 exists. It is part of ResendRequestV0.
        if (messageVersion === 1) {
            return new ResendLastRequestV1(...resendLastRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}
