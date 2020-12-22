import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import UnsupportedTypeError from '../../errors/UnsupportedTypeError'
import { validateIsInteger, validateIsString } from '../../utils/validations'
import { Serializer } from '../../Serializer'

// TODO use ControlMessageType instead of number when we have real enums
const serializerByVersionAndType: {[version: string]: { [type: number]: Serializer<ControlMessage> }} = {}
const LATEST_VERSION = 2

// TODO convert to real enum?
export type ControlMessageType = number

export default class ControlMessage {

    static LATEST_VERSION = LATEST_VERSION

    static TYPES: { [key: string]: ControlMessageType } = {
        BroadcastMessage: 0,
        UnicastMessage: 1,
        SubscribeResponse: 2,
        UnsubscribeResponse: 3,
        ResendResponseResending: 4,
        ResendResponseResent: 5,
        ResendResponseNoResend: 6,
        ErrorResponse: 7,
        PublishRequest: 8,
        SubscribeRequest: 9,
        UnsubscribeRequest: 10,
        ResendLastRequest: 11,
        ResendFromRequest: 12,
        ResendRangeRequest: 13,
    }

    version: number
    type: ControlMessageType
    requestId: string

    constructor(version = LATEST_VERSION, type: ControlMessageType, requestId: string) {
        if (new.target === ControlMessage) {
            throw new TypeError('ControlMessage is abstract.')
        }
        validateIsInteger('version', version)
        this.version = version
        validateIsInteger('type', type)
        this.type = type

        // Since V2 - allow null in older versions
        validateIsString('requestId', requestId, version < 2)
        this.requestId = requestId
    }

    static registerSerializer(version: number, type: ControlMessageType, serializer: Serializer<ControlMessage>) {
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

    static unregisterSerializer(version: number, type: ControlMessageType) {
        delete serializerByVersionAndType[version][type]
    }

    static getSerializer(version: number, type: ControlMessageType) {
        const serializersByType = serializerByVersionAndType[version]
        if (!serializersByType) {
            throw new UnsupportedVersionError(version, `Supported versions: [${ControlMessage.getSupportedVersions()}]`)
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

    serialize(version = this.version, ...typeSpecificSerializeArgs: any[]) {
        return JSON.stringify(ControlMessage.getSerializer(version, this.type).toArray(this, ...typeSpecificSerializeArgs))
    }

    /**
     * Takes a serialized representation (array or string) of a message, and returns a ControlMessage instance.
     */
    static deserialize(msg: any, ...typeSpecificDeserializeArgs: any[]) {
        const messageArray = (typeof msg === 'string' ? JSON.parse(msg) : msg)

        /* eslint-disable prefer-destructuring */
        const messageVersion = messageArray[0]
        const messageType = messageArray[1]
        /* eslint-enable prefer-destructuring */

        const C = ControlMessage.getSerializer(messageVersion, messageType)
        return C.fromArray(messageArray, ...typeSpecificDeserializeArgs)
    }
}
