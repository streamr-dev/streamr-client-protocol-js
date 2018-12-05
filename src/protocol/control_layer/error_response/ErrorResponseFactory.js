import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ErrorPayload from './ErrorPayload'
import ErrorResponseV0 from './ErrorResponseV0'
import ErrorResponseV1 from './ErrorResponseV1'

export default class ErrorResponseFactory {
    static deserialize(messageVersion, errorResponseSpecificArgsArray) {
        if (messageVersion === 0) {
            const errorObject = errorResponseSpecificArgsArray[1] // index 0 is the null subId
            const payload = ErrorPayload.deserialize(errorObject)
            return new ErrorResponseV0(payload.error)
        } else if (messageVersion === 1) {
            return new ErrorResponseV1(...errorResponseSpecificArgsArray)
        }
        throw new UnsupportedVersionError(messageVersion, 'Supported versions: [0, 1]')
    }
}
