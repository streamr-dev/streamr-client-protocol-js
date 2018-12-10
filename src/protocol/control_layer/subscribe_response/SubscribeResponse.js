import ControlMessage from '../ControlMessage'

const TYPE = 2

class SubscribeResponse extends ControlMessage {
    constructor(version) {
        super(version, TYPE)
    }
}

/* static */ SubscribeResponse.TYPE = TYPE

module.exports = SubscribeResponse
