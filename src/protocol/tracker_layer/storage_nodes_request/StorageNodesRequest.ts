import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
} from '../../../utils/validations'
import TrackerMessage from '../TrackerMessage'

export default class StorageNodesRequest extends TrackerMessage {

    streamId: string
    streamPartition: number

    constructor({ version = TrackerMessage.LATEST_VERSION, requestId, streamId, streamPartition }: { version?: number, requestId: string, streamId: string, streamPartition: number}) {
        super(version, TrackerMessage.TYPES.StorageNodesRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }
}
