import ControlMessage from '../ControlMessage'
import ResendResponsePayload from '../ResendResponsePayload'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 5

export default class ResendResponseResent extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseResent) {
            throw new TypeError('ResendResponseResent is abstract.')
        }
        super(version, TYPE)
    }

    static create(streamId, streamPartition, subId) {
        return new (ControlMessage.getV1Class(TYPE))(streamId, streamPartition, subId)
    }

    static deserialize(messageVersion, resendResponseResentSpecificArgsArray) {
        if (messageVersion === 0) {
            const payloadObject = resendResponseResentSpecificArgsArray[1] // index 0 is the null subId
            const payload = ResendResponsePayload.deserialize(payloadObject)
            return new (ControlMessage.getV0Class(TYPE))(...(ControlMessage.getV0Class(TYPE)).getConstructorArguments(payload))
        } else if (messageVersion === 1) {
            return new (ControlMessage.getV1Class(TYPE))(...resendResponseResentSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ ResendResponseResent.TYPE = TYPE
