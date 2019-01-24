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
            return new (ControlMessage.getClass(1, TYPE))(...resendFromRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }

    static create(streamId, streamPartition, subId, msgRefArgsArray, publisherId, sessionToken) {
        const C = ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE)
        return new C(streamId, streamPartition, subId, msgRefArgsArray, publisherId, sessionToken)
    }
}

/* static */ ResendFromRequest.TYPE = TYPE
