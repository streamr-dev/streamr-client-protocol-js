import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

const TYPE = 2

export default class SubscribeResponse extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }

    static create(requestId, streamId, streamPartition) {
        return new SubscribeResponse(ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition)
    }
}

/* static */
SubscribeResponse.TYPE = TYPE
