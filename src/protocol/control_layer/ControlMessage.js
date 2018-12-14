import ValidationError from '../../errors/ValidationError'

export default class ControlMessage {
    constructor(version, type) {
        if (new.target === ControlMessage) {
            throw new TypeError('ControlMessage is abstract.')
        }
        this.version = version
        if (type === undefined) {
            throw new ValidationError('No message type given!')
        }
        this.type = type
    }

    toArray() {
        return [
            this.version,
            this.type,
        ]
    }

    toOtherVersion() {
        throw new Error(`Class ${this.constructor.name} must override ControlMessage.toOtherVersion(version) or ControlMessage.serialize(version)`)
    }

    serialize(version = this.version) {
        if (version === this.version) {
            return JSON.stringify(this.toArray())
        }
        return this.toOtherVersion(version).serialize()
    }
}
