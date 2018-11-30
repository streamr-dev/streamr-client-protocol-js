import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'

const TYPE = 10

class UnsubscribeRequest extends ControlMessage {
    constructor(version, streamId, streamPartition = 0) {
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
}

/* static */ UnsubscribeRequest.TYPE = TYPE

module.exports = UnsubscribeRequest
