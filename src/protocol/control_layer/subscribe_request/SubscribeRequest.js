import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'

const TYPE = 9

class SubscribeRequest extends ControlMessage {
    constructor(version, streamId, streamPartition = 0, sessionToken, apiKey) {
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
        this.apiKey = apiKey
    }
}

/* static */ SubscribeRequest.TYPE = TYPE

module.exports = SubscribeRequest
