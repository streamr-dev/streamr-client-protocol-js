import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

const TYPE = 10

export default class UnsubscribeRequest extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }

    static create(requestId, streamId, streamPartition) {
        return new UnsubscribeRequest(ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition)
    }
}

/* static */
UnsubscribeRequest.TYPE = TYPE
