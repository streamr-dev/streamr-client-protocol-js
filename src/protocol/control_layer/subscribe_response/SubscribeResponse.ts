// @ts-nocheck
import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

export default class SubscribeResponse extends ControlMessage {
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition }) {
        super(version, ControlMessage.TYPES.SubscribeResponse, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }
}
