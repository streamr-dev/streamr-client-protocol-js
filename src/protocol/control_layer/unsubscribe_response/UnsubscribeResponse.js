import ControlMessage from '../ControlMessage'

const TYPE = 3

class UnsubscribeResponse extends ControlMessage {
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

/* static */ UnsubscribeResponse.TYPE = TYPE

module.exports = UnsubscribeResponse
