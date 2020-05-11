import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

const TYPE = 5

export default class ResendResponseResent extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.requestId = requestId // unnecessary line once V1 is dropped
    }

    static create(...args) {
        return new ResendResponseResent(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */
ResendResponseResent.TYPE = TYPE
