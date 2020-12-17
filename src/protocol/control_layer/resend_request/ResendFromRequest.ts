import ControlMessage from '../ControlMessage'
import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
    validateIsString,
    validateIsType
} from '../../../utils/validations'
import MessageRef from '../../message_layer/MessageRef'
import { Todo } from '../../../sharedTypes'

export default class ResendFromRequest extends ControlMessage {

    streamId: string
    streamPartition: number
    fromMsgRef: Todo
    publisherId: string | undefined | null
    sessionToken: string | undefined | null

    constructor({
        version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, fromMsgRef, publisherId, sessionToken
    }: Todo) {
        super(version, ControlMessage.TYPES.ResendFromRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsString('publisherId', publisherId, true)
        validateIsString('sessionToken', sessionToken, true)
        validateIsType('fromMsgRef', fromMsgRef, 'MessageRef', MessageRef)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.fromMsgRef = fromMsgRef
        this.publisherId = publisherId
        this.sessionToken = sessionToken

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }
}
