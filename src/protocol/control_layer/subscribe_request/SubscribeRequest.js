import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'

const TYPE = 9

class SubscribeRequest extends ControlMessage {
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
}

/* static */ SubscribeRequest.TYPE = TYPE

module.exports = SubscribeRequest