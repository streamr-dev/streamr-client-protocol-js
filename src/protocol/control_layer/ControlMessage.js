import ValidationError from '../../errors/ValidationError'

export default class ControlMessage {
    constructor(version, type) {
        this.version = version || 0
        if (!type) {
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

    serialize() {
        return JSON.stringify(this.toArray())
    }
}
