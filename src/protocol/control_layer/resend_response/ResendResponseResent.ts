import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

export default class ResendResponseResent extends ControlMessage {

    streamId: string
    streamPartition: number

    constructor({ version, requestId, streamId, streamPartition }: { version: number, requestId: string, streamId: string, streamPartition: number}) {
        super(version, ControlMessage.TYPES.ResendResponseResent, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }
}
