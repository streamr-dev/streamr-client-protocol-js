import { Todo } from '../../../sharedTypes'
import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
    validateIsArray
} from '../../../utils/validations'
import TrackerMessage from '../TrackerMessage'

export default class InstructionMessage extends TrackerMessage {

    streamId: string
    streamPartition: number
    nodeIds: Todo
    counter: number

    constructor({
        version = TrackerMessage.LATEST_VERSION, requestId, streamId, streamPartition, nodeIds, counter
    }: Todo) {
        super(version, TrackerMessage.TYPES.InstructionMessage, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsArray('nodeIds', nodeIds)
        validateIsNotNegativeInteger('counter', counter)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.nodeIds = nodeIds
        this.counter = counter
    }
}
