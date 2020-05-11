import ControlMessage from '../ControlMessage'
import { validateIsNotEmptyString, validateIsNotNegativeInteger, validateIsString } from '../../../utils/validations'

const TYPE = 11

export default class ResendLastRequest extends ControlMessage {
    constructor(version, requestId, streamId, streamPartition, numberLast, sessionToken) {
        super(version, TYPE, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsNotNegativeInteger('numberLast', numberLast)
        validateIsString('sessionToken', sessionToken, true)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.numberLast = numberLast
        this.sessionToken = sessionToken
    }

    static create(...args) {
        return new ResendLastRequest(ControlMessage.LATEST_VERSION, ...args)
    }
}

/* static */
ResendLastRequest.TYPE = TYPE
