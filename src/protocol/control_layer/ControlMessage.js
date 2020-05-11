import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import UnsupportedTypeError from '../../errors/UnsupportedTypeError'
import { validateIsInteger, validateIsString } from '../../utils/validations'

const serializerByVersionAndType = {}
const LATEST_VERSION = 2

export default class ControlMessage {
    constructor(version, type, requestId) {
        if (new.target === ControlMessage) {
            throw new TypeError('ControlMessage is abstract.')
        }
        validateIsInteger('version', version)
        this.version = version
        validateIsInteger('type', type)
        this.type = type

        // Since V2
        if (version >= 2) {
            validateIsString('requestId', requestId)
            this.requestId = requestId
        }
    }

    static registerSerializer(version, type, clazz) {
        if (serializerByVersionAndType[version] === undefined) {
            serializerByVersionAndType[version] = {}
        }
        serializerByVersionAndType[version][type] = clazz
    }

    static getSerializer(version, type) {
        const serializersByType = serializerByVersionAndType[version]
        if (!serializersByType) {
            throw new UnsupportedVersionError(version, `Supported versions: [${Object.keys(serializerByVersionAndType)}]`)
        }
        const clazz = serializersByType[type]
        if (!clazz) {
            throw new UnsupportedTypeError(type, `Supported types: [${Object.keys(serializersByType)}]`)
        }
        return serializerByVersionAndType[version][type]
    }

    serialize(version = this.version, ...typeSpecificSerializeArgs) {
        return JSON.stringify(ControlMessage.getSerializer(this.version, this.type).toArray(this, ...typeSpecificSerializeArgs))
    }

    /**
     * Takes a serialized representation (array or string) of a message, and returns a ControlMessage instance.
     */
    static deserialize(msg, parseContent = true) {
        const messageArray = (typeof msg === 'string' ? JSON.parse(msg) : msg)

        /* eslint-disable prefer-destructuring */
        const messageVersion = messageArray[0]
        const messageType = messageArray[1]
        /* eslint-enable prefer-destructuring */

        const C = ControlMessage.getSerializer(messageVersion, messageType)
        return C.deserialize(messageArray)
    }
}

/* static */
ControlMessage.LATEST_VERSION = LATEST_VERSION
