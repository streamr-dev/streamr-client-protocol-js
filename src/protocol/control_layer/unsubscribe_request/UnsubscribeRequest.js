import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 10

export default class UnsubscribeRequest extends ControlMessage {
    constructor(version, streamId, streamPartition) {
        if (new.target === UnsubscribeRequest) {
            throw new TypeError('UnSubscribeRequest is abstract.')
        }
        super(version, TYPE)
        this.streamId = streamId
        if (streamPartition == null) {
            throw new ValidationError('Stream partition not given!')
        }
        this.streamPartition = streamPartition
    }

    static create(streamId, streamPartition) {
        return new (ControlMessage.getV1Class(TYPE))(streamId, streamPartition)
    }

    static deserialize(messageVersion, unsubscribeRequestSpecificArgsArray) {
        // Version 0 is an object not an array, it is handled by ControlMessageV0Factory and UnsubscribeRequestV0.
        if (messageVersion === 1) {
            return new (ControlMessage.getV1Class(TYPE))(...unsubscribeRequestSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [1]')
    }
}

/* static */ UnsubscribeRequest.TYPE = TYPE

module.exports = UnsubscribeRequest
