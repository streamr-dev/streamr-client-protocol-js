import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendRangeRequestV1 from './ResendRangeRequestV1'

export default class ResendRangeRequestFactory {
    static deserialize(messageVersion, resendRangeRequestSpecificArgsArray) {
        // No Version 0 exists. It is part of ResendRequestV0.
        if (messageVersion === 1) {
            return new ResendRangeRequestV1(...resendRangeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}
