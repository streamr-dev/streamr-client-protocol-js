import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
    validateIsArray
} from '../../../utils/validations'
import TrackerMessage, { TrackerMessageOptions } from '../TrackerMessage'
import { formLogFriendlyString } from "../../helpers"

export interface Options extends TrackerMessageOptions {
    streamId: string
    streamPartition: number
    nodeIds: string[]
    counter: number
}

export default class InstructionMessage extends TrackerMessage {

    streamId: string
    streamPartition: number
    nodeIds: string[]
    counter: number

    constructor({ version = TrackerMessage.LATEST_VERSION, requestId, streamId, streamPartition, nodeIds, counter }: Options) {
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

    toString(): string {
        return formLogFriendlyString(
            this.constructor.name, false,
            'requestId', this.requestId,
            'streamId', this.streamId,
            'streamPartition', this.streamPartition,
            'nodeIds', this.nodeIds,
            'counter', this.counter
        )
    }
}
