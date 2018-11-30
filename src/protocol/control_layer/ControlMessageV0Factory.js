import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import PublishRequestV0 from './PublishRequestV0'

const messageClassByMessageType = {
    publish: PublishRequestV0,
}

export default class ControlMessageV0Factory {
    static checkVersion(message) {
        const version = message.version || 0
        if (version !== 0) {
            throw new UnsupportedVersionError(version, 'Supported versions: [0]')
        }
    }

    static deserialize(stringOrObject) {
        const message = typeof stringOrObject === 'string' ? JSON.parse(stringOrObject) : stringOrObject
        this.checkVersion(message)
        const constructorArgs = messageClassByMessageType[message.type].getConstructorArguments(message)
        return new messageClassByMessageType[message.type](...constructorArgs)
    }
}

ControlMessageV0Factory.messageClassByMessageType = messageClassByMessageType
