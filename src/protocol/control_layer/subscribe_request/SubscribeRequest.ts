import { Todo } from '../../../sharedTypes'
import { validateIsNotEmptyString, validateIsNotNegativeInteger, validateIsString } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

export default class SubscribeRequest extends ControlMessage {

    streamId: string
    streamPartition: number
    sessionToken: string | undefined | null

    constructor({
        version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, sessionToken
    }: Todo) {
        super(version, ControlMessage.TYPES.SubscribeRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.sessionToken = sessionToken
    }
}
