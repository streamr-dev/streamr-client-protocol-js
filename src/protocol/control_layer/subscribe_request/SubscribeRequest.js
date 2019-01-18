import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 9

export default class SubscribeRequest extends ControlMessage {
    constructor(version, streamId, streamPartition, sessionToken) {
        if (new.target === SubscribeRequest) {
            throw new TypeError('SubscribeRequest is abstract.')
        }
        super(version, TYPE)
        this.streamId = streamId
        if (streamPartition == null) {
            throw new ValidationError('Stream partition not given!')
        }
        this.streamPartition = streamPartition
        this.sessionToken = sessionToken
    }

    static create(streamId, streamPartition, sessionToken) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition, sessionToken)
    }

    static deserialize(messageVersion, subscribeRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and SubscribeRequestV0.
        if (messageVersion === 1) {
            return new (ControlMessage.getClass(1, TYPE))(...subscribeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}

/* static */ SubscribeRequest.TYPE = TYPE
