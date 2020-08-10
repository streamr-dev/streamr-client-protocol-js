import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
} from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

export default class StorageNodesRequest extends ControlMessage {
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition }) {
        super(version, ControlMessage.TYPES.StorageNodesRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }
}
