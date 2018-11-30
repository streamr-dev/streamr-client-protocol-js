import ControlMessage from './ControlMessage'

const TYPE = 9

class PublishRequest extends ControlMessage {
    constructor(version, sessionToken, apiKey) {
        if (new.target === PublishRequest) {
            throw new TypeError('PublishRequest is abstract.')
        }
        super(version, TYPE)
        this.sessionToken = sessionToken
        this.apiKey = apiKey
    }
}

/* static */ PublishRequest.TYPE = TYPE

module.exports = PublishRequest
