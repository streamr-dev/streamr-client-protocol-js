import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

const TYPE = 3

export default class UnsubscribeResponse extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }

    static create(...args) {
        return new UnsubscribeResponse(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */
UnsubscribeResponse.TYPE = TYPE
