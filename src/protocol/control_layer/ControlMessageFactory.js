import UnsupportedVersionError from '../../errors/UnsupportedVersionError'
import PublishRequest from './publish_request/PublishRequest'
import PublishRequestFactory from './publish_request/PublishRequestFactory'
import SubscribeRequest from './subscribe_request/SubscribeRequest'
import SubscribeRequestFactory from './subscribe_request/SubscribeRequestFactory'
import UnsubscribeRequest from './unsubscribe_request/UnsubscribeRequest'
import UnsubscribeRequestFactory from './unsubscribe_request/UnsubscribeRequestFactory'
import BroadcastMessage from './broadcast_message/BroadcastMessage'
import BroadcastMessageFactory from './broadcast_message/BroadcastMessageFactory'
import UnicastMessage from './unicast_message/UnicastMessage'
import UnicastMessageFactory from './unicast_message/UnicastMessageFactory'
import SubscribeResponse from './subscribe_response/SubscribeResponse'
import SubscribeResponseFactory from './subscribe_response/SubscribeResponseFactory'
import UnsubscribeResponse from './unsubscribe_response/UnsubscribeResponse'
import UnsubscribeResponseFactory from './unsubscribe_response/UnsubscribeResponseFactory'
import ResendResponseResending from './resend_response_resending/ResendResponseResending'
import ResendResponseResendingFactory from './resend_response_resending/ResendResponseResendingFactory'
import ResendResponseResent from './resend_response_resent/ResendResponseResent'
import ResendResponseResentFactory from './resend_response_resent/ResendResponseResentFactory'
import ResendResponseNoResend from './resend_response_no_resend/ResendResponseNoResend'
import ResendResponseNoResendFactory from './resend_response_no_resend/ResendResponseNoResendFactory'
import ResendLastRequestV1 from './resend_request/ResendLastRequestV1'
import ResendLastRequestFactory from './resend_request/ResendLastRequestFactory'
import ResendFromRequestV1 from './resend_request/ResendFromRequestV1'
import ResendFromRequestFactory from './resend_request/ResendFromRequestFactory'
import ResendRangeRequestV1 from './resend_request/ResendRangeRequestV1'
import ResendRangeRequestFactory from './resend_request/ResendRangeRequestFactory'
import ErrorResponse from './error_response/ErrorResponse'
import ErrorResponseFactory from './error_response/ErrorResponseFactory'
import ControlMessageV0Factory from './ControlMessageV0Factory'

const factoryByMessageType = {}
factoryByMessageType[PublishRequest.TYPE] = PublishRequestFactory
factoryByMessageType[SubscribeRequest.TYPE] = SubscribeRequestFactory
factoryByMessageType[UnsubscribeRequest.TYPE] = UnsubscribeRequestFactory
factoryByMessageType[BroadcastMessage.TYPE] = BroadcastMessageFactory
factoryByMessageType[UnicastMessage.TYPE] = UnicastMessageFactory
factoryByMessageType[SubscribeResponse.TYPE] = SubscribeResponseFactory
factoryByMessageType[UnsubscribeResponse.TYPE] = UnsubscribeResponseFactory
factoryByMessageType[ResendResponseResending.TYPE] = ResendResponseResendingFactory
factoryByMessageType[ResendResponseResent.TYPE] = ResendResponseResentFactory
factoryByMessageType[ResendResponseNoResend.TYPE] = ResendResponseNoResendFactory
factoryByMessageType[ResendLastRequestV1.TYPE] = ResendLastRequestFactory
factoryByMessageType[ResendFromRequestV1.TYPE] = ResendFromRequestFactory
factoryByMessageType[ResendRangeRequestV1.TYPE] = ResendRangeRequestFactory
factoryByMessageType[ErrorResponse.TYPE] = ErrorResponseFactory

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
