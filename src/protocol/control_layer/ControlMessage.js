import ValidationError from '../../errors/ValidationError'

export default class ControlMessage {
    constructor(version, type) {
        this.version = version || 0
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
}
