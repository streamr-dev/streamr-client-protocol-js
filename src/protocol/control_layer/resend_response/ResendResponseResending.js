import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

const TYPE = 4

export default class ResendResponseResending extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.requestId = requestId // unnecessary line once V1 is dropped
    }

    static create(requestId, streamId, streamPartition) {
        return new ResendResponseResending(ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition)
    }
}

/* static */
ResendResponseResending.TYPE = TYPE
