import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
} from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

export default class FindStorageNodesMessage extends ControlMessage {
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition }) {
        super(version, ControlMessage.TYPES.FindStorageNodesMessage, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }
}
