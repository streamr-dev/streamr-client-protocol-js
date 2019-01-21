import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

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
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition, subId, msgRefArgsArray, publisherId, sessionToken)
    }
}

/* static */ ResendFromRequest.TYPE = TYPE
ControlMessageFactory.registerFactory(ResendFromRequest.TYPE, ResendFromRequest)
