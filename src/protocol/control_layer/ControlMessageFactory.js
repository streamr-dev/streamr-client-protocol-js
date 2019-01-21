import UnsupportedVersionError from '../../errors/UnsupportedVersionError'

const factoryByMessageType = {}

class ControlMessageFactory {
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
        if (messageVersion === 0 || messageVersion === 1) {
            return factoryByMessageType[messageType].deserialize(messageVersion, args)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }

    static registerFactory(type, clazz) {
        factoryByMessageType[type] = clazz
    }
}
module.exports = ControlMessageFactory
