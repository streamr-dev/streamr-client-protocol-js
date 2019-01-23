import ValidationError from '../../errors/ValidationError'
import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import UnsupportedTypeError from '../../errors/UnsupportedTypeError'

const classByType = {}
const factoryByMessageType = {}
const LATEST_VERSION = 1

class ControlMessage {
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

    static getConstructorArgs(array) {
        return array
    }

    static registerClass(version, type, clazz) {
        if (classByType[version] === undefined) {
            classByType[version] = {}
        }
        classByType[version][type] = clazz
    }

    static getClass(version, type) {
        const classesByVersion = classByType[version]
        if (!classesByVersion) {
            throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
        }
        const clazz = classesByVersion[type]
        if (!clazz) {
            throw new UnsupportedTypeError(type, 'Supported types: [1-13]')
        }
        return classByType[version][type]
    }

    static deserialize(msg) {
        const messageArray = (typeof msg === 'string' ? JSON.parse(msg) : msg)
        let messageVersion
        let messageType
        let args
        // Version 0 (deprecated) uses objects instead of arrays for request types. In this case, messageArray is not an array but an object.
        if (!Array.isArray(messageArray)) {
            messageVersion = messageArray.version || 0
            messageType = messageArray.type
            args = messageArray
        } else {
            /* eslint-disable prefer-destructuring */
            messageVersion = messageArray[0]
            messageType = messageArray[1]
            /* eslint-enable prefer-destructuring */
            args = messageArray.slice(2)
        }
        return factoryByMessageType[messageType].deserialize(messageVersion, args)
    }

    static registerFactory(type, clazz) {
        factoryByMessageType[type] = clazz
    }
}
module.exports = ControlMessage
/* static */ ControlMessage.LATEST_VERSION = LATEST_VERSION
