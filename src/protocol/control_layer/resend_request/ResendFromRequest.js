import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger, validateIsString } from '../../../utils/validations'
import MessageRef from '../../message_layer/MessageRef'

const TYPE = 12

export default class ResendFromRequest extends ControlMessage {
    constructor(version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, msgRefArgsArray, publisherId, sessionToken) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsString('publisherId', publisherId, true)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.fromMsgRef = new MessageRef(...msgRefArgsArray)
        this.publisherId = publisherId
        this.sessionToken = sessionToken

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }

    static create(requestId, streamId, streamPartition, msgRefArgsArray, publisherId, sessionToken) {
        return new ResendFromRequest(ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, msgRefArgsArray, publisherId, sessionToken)
    }
}

/* static */
ResendFromRequest.TYPE = TYPE
