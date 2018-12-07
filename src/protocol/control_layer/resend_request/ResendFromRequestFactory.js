import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendFromRequestV1 from './ResendFromRequestV1'

export default class ResendFromRequestFactory {
    static deserialize(messageVersion, resendFromRequestSpecificArgsArray) {
        // No Version 0 exists. It is part of ResendRequestV0.
        if (messageVersion === 1) {
            return new ResendFromRequestV1(...resendFromRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}
