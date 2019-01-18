import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'

const TYPE = 13

export default class ResendRangeRequest extends ControlMessage {
    constructor(version) {
        if (new.target === ResendRangeRequest) {
            throw new TypeError('ResendRangeRequest is abstract.')
        }
        super(version, TYPE)
    }

    static deserialize(messageVersion, resendRangeRequestSpecificArgsArray) {
        // No Version 0 exists. It is part of ResendRequestV0.
        if (messageVersion === 1) {
            return new (ControlMessage.getV1Class(TYPE))(...resendRangeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}

/* static */ ResendRangeRequest.TYPE = TYPE
