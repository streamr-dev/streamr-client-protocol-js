import ControlMessage from '../ControlMessage'

const TYPE = 4

class ResendResponseResending extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseResending) {
            throw new TypeError('ResendResponseResending is abstract.')
        }
        super(version, TYPE)
    }

    serialize(version = this.version) {
        if (version === this.version) {
            return JSON.stringify(this.toArray())
        }
        return this.toOtherVersion(version).serialize()
    }
}

/* static */ ResendResponseResending.TYPE = TYPE

module.exports = ResendResponseResending
