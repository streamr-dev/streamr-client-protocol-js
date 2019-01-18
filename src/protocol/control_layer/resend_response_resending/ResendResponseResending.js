import ControlMessage from '../ControlMessage'
import ResendResponsePayload from '../ResendResponsePayload'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 4

export default class ResendResponseResending extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseResending) {
            throw new TypeError('ResendResponseResending is abstract.')
        }
        super(version, TYPE)
    }

    static create(streamId, streamPartition, subId) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition, subId)
    }

    static deserialize(messageVersion, resendResponseResendingSpecificArgsArray) {
        if (messageVersion === 0) {
            const payloadObject = resendResponseResendingSpecificArgsArray[1] // index 0 is the null subId
            const payload = ResendResponsePayload.deserialize(payloadObject)
            return new (ControlMessage.getClass(0, TYPE))(...(ControlMessage.getClass(0, TYPE)).getConstructorArguments(payload))
        } else if (messageVersion === 1) {
            return new (ControlMessage.getClass(1, TYPE))(...resendResponseResendingSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ ResendResponseResending.TYPE = TYPE
