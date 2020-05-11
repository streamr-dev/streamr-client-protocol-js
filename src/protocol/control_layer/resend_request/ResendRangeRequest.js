import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger, validateIsString } from '../../../utils/validations'
import MessageRef from '../../message_layer/MessageRef'
import ValidationError from '../../../errors/ValidationError'

const TYPE = 13

export default class ResendRangeRequest extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition, fromMsgRefArgsArray, toMsgRefArgsArray, publisherId, msgChainId, sessionToken) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsString('publisherId', publisherId, true)
        validateIsString('msgChainId', msgChainId, true)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.fromMsgRef = new MessageRef(...fromMsgRefArgsArray)
        this.toMsgRef = new MessageRef(...toMsgRefArgsArray)
        if (this.fromMsgRef.timestamp > this.toMsgRef.timestamp) {
            throw new ValidationError(`fromMsgRef.timestamp (${this.fromMsgRef.timestamp})`
                + `must be less than or equal to toMsgRef.timestamp (${this.toMsgRef.timestamp})`)
        }
        this.publisherId = publisherId
        this.msgChainId = msgChainId
        this.sessionToken = sessionToken
    }

    static create(requestId, streamId, streamPartition, fromMsgRefArgsArray, toMsgRefArgsArray, publisherId, msgChainId, sessionToken) {
        return new ResendRangeRequest(ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition,
            fromMsgRefArgsArray, toMsgRefArgsArray, publisherId, msgChainId, sessionToken)
    }
}

/* static */
ResendRangeRequest.TYPE = TYPE
