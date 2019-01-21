import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

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
            return new (ControlMessage.getClass(1, TYPE))(...resendRangeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }

    static create(streamId, streamPartition, subId, fromMsgRefArgsArray, toMsgRefArgsArray, publisherId, sessionToken) {
        return new (ControlMessage.getClass(1, TYPE))(
            streamId, streamPartition, subId, fromMsgRefArgsArray,
            toMsgRefArgsArray, publisherId, sessionToken,
        )
    }
}

/* static */ ResendRangeRequest.TYPE = TYPE
ControlMessageFactory.registerFactory(ResendRangeRequest.TYPE, ResendRangeRequest)
