import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger, validateIsString } from '../../../utils/validations'

export default class ResendLastRequest extends ControlMessage {

    streamId: string 
    streamPartition: number
    numberLast: number
    sessionToken: string | null

    constructor({
        version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, numberLast, sessionToken
    }: { version?: number, requestId: string, streamId: string, streamPartition: number, numberLast: number, sessionToken: string | null}) {
        super(version, ControlMessage.TYPES.ResendLastRequest, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsNotNegativeInteger('numberLast', numberLast)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.numberLast = numberLast
        this.sessionToken = sessionToken

        validateIsNotEmptyString('requestId', requestId) // unnecessary line once V1 is dropped
    }
}
