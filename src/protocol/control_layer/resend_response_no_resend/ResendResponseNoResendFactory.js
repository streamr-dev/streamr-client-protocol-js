import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendResponsePayload from '../ResendResponsePayload'
import ResendResponseNoResendV0 from './ResendResponseNoResendV0'
import ResendResponseNoResendV1 from './ResendResponseNoResendV1'

export default class ResendResponseNoResendFactory {
    static deserialize(messageVersion, resendResponseNoResendSpecificArgsArray) {
        if (messageVersion === 0) {
            const payloadObject = resendResponseNoResendSpecificArgsArray[1] // index 0 is the null subId
            const payload = ResendResponsePayload.deserialize(payloadObject)
            return new ResendResponseNoResendV0(...ResendResponseNoResendV0.getConstructorArguments(payload))
        } else if (messageVersion === 1) {
            return new ResendResponseNoResendV1(...resendResponseNoResendSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
