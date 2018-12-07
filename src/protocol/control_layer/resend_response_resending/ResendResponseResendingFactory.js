import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendResponsePayload from '../ResendResponsePayload'
import ResendResponseResendingV0 from './ResendResponseResendingV0'
import ResendResponseResendingV1 from './ResendResponseResendingV1'

export default class ResendResponseResendingFactory {
    static deserialize(messageVersion, resendResponseResendingSpecificArgsArray) {
        if (messageVersion === 0) {
            const payloadObject = resendResponseResendingSpecificArgsArray[1] // index 0 is the null subId
            const payload = ResendResponsePayload.deserialize(payloadObject)
            return new ResendResponseResendingV0(...ResendResponseResendingV0.getConstructorArguments(payload))
        } else if (messageVersion === 1) {
            return new ResendResponseResendingV1(...resendResponseResendingSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
