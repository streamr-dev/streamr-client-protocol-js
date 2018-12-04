import ControlMessage from '../ControlMessage'

const TYPE = 2

class SubscribeResponse extends ControlMessage {
    constructor(version) {
        super(version, TYPE)
    }

    serialize(version = this.version) {
        if (version === this.version) {
            return JSON.stringify(this.toArray())
        }
        return this.toOtherVersion(version).serialize()
    }
}

/* static */ SubscribeResponse.TYPE = TYPE

module.exports = SubscribeResponse
