import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

export default class UnsubscribeRequest extends ControlMessage {

    streamId: string
    streamPartition: number
    
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition }: { version?: number, requestId?: string, streamId: string, streamPartition: number}) {
        super(version, ControlMessage.TYPES.UnsubscribeRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }
}
