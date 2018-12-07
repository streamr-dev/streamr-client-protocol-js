import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendResponsePayload from '../ResendResponsePayload'
import ResendResponseResentV0 from './ResendResponseResentV0'
import ResendResponseResentV1 from './ResendResponseResentV1'

export default class ResendResponseResentFactory {
    static deserialize(messageVersion, resendResponseResentSpecificArgsArray) {
        if (messageVersion === 0) {
            const payloadObject = resendResponseResentSpecificArgsArray[1] // index 0 is the null subId
            const payload = ResendResponsePayload.deserialize(payloadObject)
            return new ResendResponseResentV0(...ResendResponseResentV0.getConstructorArguments(payload))
        } else if (messageVersion === 1) {
            return new ResendResponseResentV1(...resendResponseResentSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
