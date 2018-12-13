import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import PublishRequestV0 from './publish_request/PublishRequestV0'
import SubscribeRequestV0 from './subscribe_request/SubscribeRequestV0'
import UnsubscribeRequestV0 from './unsubscribe_request/UnsubscribeRequestV0'
import ResendRequest from './resend_request/ResendRequestV0'

const messageClassByMessageType = {
    publish: PublishRequestV0,
    subscribe: SubscribeRequestV0,
    unsubscribe: UnsubscribeRequestV0,
    resend: ResendRequest,
}

export default class ControlMessageV0Factory {
    static checkVersion(message) {
        const version = message.version || 0
        if (version !== 0) {
            throw new UnsupportedVersionError(version, 'Supported versions: [0]')
        }
    }

    static deserialize(message) {
        this.checkVersion(message)
        const constructorArgs = messageClassByMessageType[message.type].getConstructorArguments(message)
        return new messageClassByMessageType[message.type](...constructorArgs)
    }
}

ControlMessageV0Factory.messageClassByMessageType = messageClassByMessageType
