import ControlMessage, { ControlMessageOptions } from '../ControlMessage'
import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
    validateIsString,
    validateIsType
} from '../../../utils/validations'
import MessageRef from '../../message_layer/MessageRef'
import ValidationError from '../../../errors/ValidationError'

export interface Options extends ControlMessageOptions {
    streamId: string
    streamPartition: number
    fromMsgRef: MessageRef
    toMsgRef: MessageRef
    publisherId: string | null
    msgChainId: string | null
    sessionToken: string | null
}

export default class ResendRangeRequest extends ControlMessage {

    streamId: string
    streamPartition: number
    fromMsgRef: MessageRef
    toMsgRef: MessageRef
    publisherId: string | null
    msgChainId: string | null
    sessionToken: string | null

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, fromMsgRef, toMsgRef, publisherId, msgChainId, sessionToken }: Options) {
        super(version, ControlMessage.TYPES.ResendRangeRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsType('fromMsgRef', fromMsgRef, 'MessageRef', MessageRef)
        validateIsType('toMsgRef', toMsgRef, 'MessageRef', MessageRef)
        validateIsString('publisherId', publisherId, true)
        validateIsString('msgChainId', msgChainId, true)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.fromMsgRef = fromMsgRef
        this.toMsgRef = toMsgRef
        if (this.fromMsgRef.timestamp > this.toMsgRef.timestamp) {
            throw new ValidationError(`fromMsgRef.timestamp (${this.fromMsgRef.timestamp})`
                + `must be less than or equal to toMsgRef.timestamp (${this.toMsgRef.timestamp})`)
        }
        this.publisherId = publisherId
        this.msgChainId = msgChainId
        this.sessionToken = sessionToken
    }
}
