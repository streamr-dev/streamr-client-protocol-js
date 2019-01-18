import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import PublishRequest from './publish_request/PublishRequest'
import SubscribeRequest from './subscribe_request/SubscribeRequest'
import UnsubscribeRequest from './unsubscribe_request/UnsubscribeRequest'
import BroadcastMessage from './broadcast_message/BroadcastMessage'
import UnicastMessage from './unicast_message/UnicastMessage'
import SubscribeResponse from './subscribe_response/SubscribeResponse'
import UnsubscribeResponse from './unsubscribe_response/UnsubscribeResponse'
import ResendResponseResending from './resend_response_resending/ResendResponseResending'
import ResendResponseResent from './resend_response_resent/ResendResponseResent'
import ResendResponseNoResend from './resend_response_no_resend/ResendResponseNoResend'
import ResendLastRequest from './resend_request/ResendLastRequest'
import ResendFromRequest from './resend_request/ResendFromRequest'
import ResendRangeRequest from './resend_request/ResendRangeRequest'
import ErrorResponse from './error_response/ErrorResponse'
import ControlMessageV0Factory from './ControlMessageV0Factory'

const factoryByMessageType = {}
factoryByMessageType[PublishRequest.TYPE] = PublishRequest
factoryByMessageType[SubscribeRequest.TYPE] = SubscribeRequest
factoryByMessageType[UnsubscribeRequest.TYPE] = UnsubscribeRequest
factoryByMessageType[BroadcastMessage.TYPE] = BroadcastMessage
factoryByMessageType[UnicastMessage.TYPE] = UnicastMessage
factoryByMessageType[SubscribeResponse.TYPE] = SubscribeResponse
factoryByMessageType[UnsubscribeResponse.TYPE] = UnsubscribeResponse
factoryByMessageType[ResendResponseResending.TYPE] = ResendResponseResending
factoryByMessageType[ResendResponseResent.TYPE] = ResendResponseResent
factoryByMessageType[ResendResponseNoResend.TYPE] = ResendResponseNoResend
factoryByMessageType[ResendLastRequest.TYPE] = ResendLastRequest
factoryByMessageType[ResendFromRequest.TYPE] = ResendFromRequest
factoryByMessageType[ResendRangeRequest.TYPE] = ResendRangeRequest
factoryByMessageType[ErrorResponse.TYPE] = ErrorResponse

export default class ControlMessageFactory {
    static buildControlMessage(version, type, typeSpecificArgsArray) {
        return factoryByMessageType[type].deserialize(version, typeSpecificArgsArray)
    }

    static deserialize(msg) {
        const messageArray = (typeof msg === 'string' ? JSON.parse(msg) : msg)

        // Version 0 (deprecated) uses objects instead of arrays for request types. In this case, messageArray is not an array but an object.
        if (!Array.isArray(messageArray)) {
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
