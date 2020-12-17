import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import UnsupportedTypeError from '../../errors/UnsupportedTypeError'
import { validateIsInteger, validateIsString } from '../../utils/validations'
import { Todo } from '../../sharedTypes'

const serializerByVersionAndType: Todo = {}
const LATEST_VERSION = 1

export default class TrackerMessage {

    static LATEST_VERSION = LATEST_VERSION

    static TYPES = {
        StatusMessage: 1,
        InstructionMessage: 2,
        StorageNodesRequest: 3,
        StorageNodesResponse: 4,
        RelayMessage: 5,
        ErrorMessage: 6
    }

    version: number
    type: number
    requestId: string

    constructor(version = LATEST_VERSION, type: number, requestId: string) {
        if (new.target === TrackerMessage) {
            throw new TypeError('TrackerMessage is abstract.')
        }

        validateIsInteger('version', version)
        validateIsInteger('type', type)
        validateIsString('requestId', requestId)

        this.version = version
        this.type = type
        this.requestId = requestId
    }

    static registerSerializer(version: number, type: number, serializer: Todo) {
        // Check the serializer interface
        if (!serializer.fromArray) {
            throw new Error(`Serializer ${JSON.stringify(serializer)} doesn't implement a method fromArray!`)
        }
        if (!serializer.toArray) {
            throw new Error(`Serializer ${JSON.stringify(serializer)} doesn't implement a method toArray!`)
        }

        if (serializerByVersionAndType[version] === undefined) {
            serializerByVersionAndType[version] = {}
        }
        if (serializerByVersionAndType[version][type] !== undefined) {
            throw new Error(`Serializer for version ${version} and type ${type} is already registered: ${
                JSON.stringify(serializerByVersionAndType[version][type])
            }`)
        }
        serializerByVersionAndType[version][type] = serializer
    }

    static unregisterSerializer(version: number, type: number) {
        delete serializerByVersionAndType[version][type]
    }

    static getSerializer(version: number, type: number) {
        const serializersByType = serializerByVersionAndType[version]
        if (!serializersByType) {
            throw new UnsupportedVersionError(version, `Supported versions: [${TrackerMessage.getSupportedVersions()}]`)
        }
        const clazz = serializersByType[type]
        if (!clazz) {
            throw new UnsupportedTypeError(type, `Supported types: [${Object.keys(serializersByType)}]`)
        }
        return clazz
    }

    static getSupportedVersions() {
        return Object.keys(serializerByVersionAndType).map((key) => parseInt(key, 10))
    }

    serialize(version = this.version, ...typeSpecificSerializeArgs: Todo[]) {
        return JSON.stringify(TrackerMessage.getSerializer(version, this.type).toArray(this, ...typeSpecificSerializeArgs))
    }

    /**
     * Takes a serialized representation (array or string) of a message, and returns a ControlMessage instance.
     */
    static deserialize(msg: Todo, ...typeSpecificDeserializeArgs: Todo[]) {
        const messageArray = (typeof msg === 'string' ? JSON.parse(msg) : msg)

        /* eslint-disable prefer-destructuring */
        const messageVersion = messageArray[0]
        const messageType = messageArray[1]
        /* eslint-enable prefer-destructuring */

        const C = TrackerMessage.getSerializer(messageVersion, messageType)
        return C.fromArray(messageArray, ...typeSpecificDeserializeArgs)
    }
}

