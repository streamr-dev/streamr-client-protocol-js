import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import PublishRequest from './PublishRequest'
import PublishRequestFactory from './PublishRequestFactory'
import ControlMessageV0Factory from './ControlMessageV0Factory'

const factoryByMessageType = {}
factoryByMessageType[PublishRequest.TYPE] = PublishRequestFactory

export default class ControlMessageFactory {
    static buildControlMessage(version, type, typeSpecificArgsArray) {
        return factoryByMessageType[type].deserialize(version, typeSpecificArgsArray)
    }

    static deserialize(msg) {
        const messageArray = (typeof msg === 'string' ? JSON.parse(msg) : msg)

        // Version 0 (deprecated) uses objects instead of arrays for request types. In this case, messageArray is not an array but an object.
        if ((!!messageArray) && (messageArray.constructor === Object)) {
            return ControlMessageV0Factory.deserialize(messageArray)
        }

        const messageVersion = messageArray[0]
        const messageType = messageArray[1]
        if (messageVersion === 0 || messageVersion === 1) {
            return this.buildControlMessage(messageVersion, messageType, messageArray.slice(2))
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
