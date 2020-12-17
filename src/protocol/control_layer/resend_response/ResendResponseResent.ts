import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'
import { Todo } from '../../../sharedTypes'

export default class ResendResponseResent extends ControlMessage {

    streamId: string
    streamPartition: number

    constructor({ version, requestId, streamId, streamPartition }: Todo) {
        super(version, ControlMessage.TYPES.ResendResponseResent, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }
}
