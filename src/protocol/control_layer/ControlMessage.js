import ValidationError from '../../errors/ValidationError'

const v0ClassByType = {}
const v1ClassByType = {}

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

    static registerV0Class(type, clazz) {
        v0ClassByType[type] = clazz
    }

    static registerV1Class(type, clazz) {
        v1ClassByType[type] = clazz
    }

    static getV0Class(type) {
        return v0ClassByType[type]
    }

    static getV1Class(type) {
        return v1ClassByType[type]
    }
}
