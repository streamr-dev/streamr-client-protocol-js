import ControlMessage from '../ControlMessage'

const TYPE = 6

class ResendResponseNoResend extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseNoResend) {
            throw new TypeError('ResendResponseNoResend is abstract.')
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

/* static */ ResendResponseNoResend.TYPE = TYPE

module.exports = ResendResponseNoResend
