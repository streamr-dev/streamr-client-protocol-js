import ControlMessage from '../ControlMessage'

const TYPE = 8

class PublishRequest extends ControlMessage {
    constructor(version, sessionToken) {
        if (new.target === PublishRequest) {
            throw new TypeError('PublishRequest is abstract.')
        }
        super(version, TYPE)
        this.sessionToken = sessionToken
    }
}

/* static */ PublishRequest.TYPE = TYPE

module.exports = PublishRequest
