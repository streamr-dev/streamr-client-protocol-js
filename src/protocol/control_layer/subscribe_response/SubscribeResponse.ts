import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger } from '../../../utils/validations'

export default class SubscribeResponse extends ControlMessage {

    streamId: string
    streamPartition: number

    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition }: { version?: number, requestId: string, streamId: string, streamPartition: number}) {
        super(version, ControlMessage.TYPES.SubscribeResponse, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)

        this.streamId = streamId
        this.streamPartition = streamPartition
    }
}