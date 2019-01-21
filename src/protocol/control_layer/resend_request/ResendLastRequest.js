import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 11

export default class ResendLastRequest extends ControlMessage {
    constructor(version) {
        if (new.target === ResendLastRequest) {
            throw new TypeError('ResendLastRequest is abstract.')
        }
        super(version, TYPE)
    }

    static deserialize(messageVersion, resendLastRequestSpecificArgsArray) {
        // No Version 0 exists. It is part of ResendRequestV0.
        if (messageVersion === 1) {
            return new (ControlMessage.getClass(1, TYPE))(...resendLastRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }

    static create(streamId, streamPartition, subId, numberLast, sessionToken) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition, subId, numberLast, sessionToken)
    }
}

/* static */ ResendLastRequest.TYPE = TYPE
ControlMessageFactory.registerFactory(ResendLastRequest.TYPE, ResendLastRequest)
