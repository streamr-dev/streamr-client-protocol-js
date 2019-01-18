import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'

const TYPE = 12

export default class ResendFromRequest extends ControlMessage {
    constructor(version) {
        if (new.target === ResendFromRequest) {
            throw new TypeError('ResendFromRequest is abstract.')
        }
        super(version, TYPE)
    }

    static deserialize(messageVersion, resendFromRequestSpecificArgsArray) {
        // No Version 0 exists. It is part of ResendRequestV0.
        if (messageVersion === 1) {
            return new (ControlMessage.getV1Class(TYPE))(...resendFromRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}

/* static */ ResendFromRequest.TYPE = TYPE
