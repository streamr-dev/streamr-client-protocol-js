/* eslint-disable no-unused-vars */
// Serializers are imported because they statically register themselves to the factory class
import BroadcastMessage from './protocol/control_layer/broadcast_message/BroadcastMessage'
import BroadcastMessageSerializerV1 from './protocol/control_layer/broadcast_message/BroadcastMessageSerializerV1'
import BroadcastMessageSerializerV2 from './protocol/control_layer/broadcast_message/BroadcastMessageSerializerV2'
import ErrorResponse from './protocol/control_layer/error_response/ErrorResponse'
import ErrorResponseSerializerV1 from './protocol/control_layer/error_response/ErrorResponseSerializerV1'
import ErrorResponseSerializerV2 from './protocol/control_layer/error_response/ErrorResponseSerializerV2'
import PublishRequest from './protocol/control_layer/publish_request/PublishRequest'
import PublishRequestSerializerV1 from './protocol/control_layer/publish_request/PublishRequestSerializerV1'
import PublishRequestSerializerV2 from './protocol/control_layer/publish_request/PublishRequestSerializerV2'
import ResendFromRequest from './protocol/control_layer/resend_request/ResendFromRequest'
import ResendFromRequestSerializerV1 from './protocol/control_layer/resend_request/ResendFromRequestSerializerV1'
import ResendFromRequestSerializerV2 from './protocol/control_layer/resend_request/ResendFromRequestSerializerV2'
import ResendLastRequest from './protocol/control_layer/resend_request/ResendLastRequest'
import ResendLastRequestSerializerV1 from './protocol/control_layer/resend_request/ResendLastRequestSerializerV1'
import ResendLastRequestSerializerV2 from './protocol/control_layer/resend_request/ResendLastRequestSerializerV2'
import ResendRangeRequest from './protocol/control_layer/resend_request/ResendRangeRequest'
import ResendRangeRequestSerializerV1 from './protocol/control_layer/resend_request/ResendRangeRequestSerializerV1'
import ResendRangeRequestSerializerV2 from './protocol/control_layer/resend_request/ResendRangeRequestSerializerV2'
import ResendResponseNoResend from './protocol/control_layer/resend_response/ResendResponseNoResend'
import ResendResponseNoResendSerializerV1
    from './protocol/control_layer/resend_response/ResendResponseNoResendSerializerV1'
import ResendResponseNoResendSerializerV2
    from './protocol/control_layer/resend_response/ResendResponseNoResendSerializerV2'
import ResendResponseResending from './protocol/control_layer/resend_response/ResendResponseResending'
import ResendResponseResendingSerializerV1
    from './protocol/control_layer/resend_response/ResendResponseResendingSerializerV1'
import ResendResponseResendingSerializerV2
    from './protocol/control_layer/resend_response/ResendResponseResendingSerializerV2'
import ResendResponseResent from './protocol/control_layer/resend_response/ResendResponseResent'
import ResendResponseResentSerializerV1 from './protocol/control_layer/resend_response/ResendResponseResentSerializerV1'
import ResendResponseResentSerializerV2 from './protocol/control_layer/resend_response/ResendResponseResentSerializerV2'
import SubscribeRequest from './protocol/control_layer/subscribe_request/SubscribeRequest'
import SubscribeRequestSerializerV1 from './protocol/control_layer/subscribe_request/SubscribeRequestSerializerV1'
import SubscribeRequestSerializerV2 from './protocol/control_layer/subscribe_request/SubscribeRequestSerializerV2'
import SubscribeResponse from './protocol/control_layer/subscribe_response/SubscribeResponse'
import SubscribeResponseSerializerV1 from './protocol/control_layer/subscribe_response/SubscribeResponseSerializerV1'
import SubscribeResponseSerializerV2 from './protocol/control_layer/subscribe_response/SubscribeResponseSerializerV2'
import UnicastMessage from './protocol/control_layer/unicast_message/UnicastMessage'
import UnicastMessageSerializerV1 from './protocol/control_layer/unicast_message/UnicastMessageSerializerV1'
import UnicastMessageSerializerV2 from './protocol/control_layer/unicast_message/UnicastMessageSerializerV2'
import UnsubscribeRequest from './protocol/control_layer/unsubscribe_request/UnsubscribeRequest'
import UnsubscribeRequestSerializerV1 from './protocol/control_layer/unsubscribe_request/UnsubscribeRequestSerializerV1'
import UnsubscribeRequestSerializerV2 from './protocol/control_layer/unsubscribe_request/UnsubscribeRequestSerializerV2'
import UnsubscribeResponse from './protocol/control_layer/unsubscribe_response/UnsubscribeResponse'
import UnsubscribeResponseSerializerV1
    from './protocol/control_layer/unsubscribe_response/UnsubscribeResponseSerializerV1'
import UnsubscribeResponseSerializerV2
    from './protocol/control_layer/unsubscribe_response/UnsubscribeResponseSerializerV2'
import ControlMessage from './protocol/control_layer/ControlMessage'
import MessageID from './protocol/message_layer/MessageID'
import MessageRef from './protocol/message_layer/MessageRef'
import StreamMessage from './protocol/message_layer/StreamMessage'
import StreamMessageSerializerV30 from './protocol/message_layer/StreamMessageSerializerV30'
import StreamMessageSerializerV31 from './protocol/message_layer/StreamMessageSerializerV31'
import InvalidJsonError from './errors/InvalidJsonError'
import UnsupportedVersionError from './errors/UnsupportedVersionError'
import GapFillFailedError from './errors/GapFillFailedError'
import ValidationError from './errors/ValidationError'
import TimestampUtil from './utils/TimestampUtil'
import OrderingUtil from './utils/OrderingUtil'
import StreamMessageValidator from './utils/StreamMessageValidator'
import CachingStreamMessageValidator from './utils/CachingStreamMessageValidator'
import MessageIDStrict from './protocol/message_layer/MessageIDStrict'
import MessageRefStrict from './protocol/message_layer/MessageRefStrict'
/* eslint-enable no-unused-vars */

export const ControlLayer = {
    BroadcastMessage,
    ErrorResponse,
    PublishRequest,
    ResendFromRequest,
    ResendLastRequest,
    ResendRangeRequest,
    ResendResponseNoResend,
    ResendResponseResending,
    ResendResponseResent,
    SubscribeRequest,
    SubscribeResponse,
    UnicastMessage,
    UnsubscribeRequest,
    UnsubscribeResponse,
    ControlMessage,
}

export const MessageLayer = {
    MessageID,
    MessageIDStrict,
    MessageRef,
    MessageRefStrict,
    StreamMessage
}

export const Errors = {
    InvalidJsonError,
    UnsupportedVersionError,
    GapFillFailedError,
    ValidationError,
}

export const Utils = {
    TimestampUtil,
    OrderingUtil,
    StreamMessageValidator,
    CachingStreamMessageValidator,
}

export default {
    ControlLayer,
    MessageLayer,
    Errors,
    Utils,
}
