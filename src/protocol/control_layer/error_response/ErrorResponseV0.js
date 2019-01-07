import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ErrorResponse from './ErrorResponse'
import ErrorPayload from './ErrorPayload'
import ErrorResponseV1 from './ErrorResponseV1'

const VERSION = 0

class ErrorResponseV0 extends ErrorResponse {
    constructor(errorMessage) {
        super(VERSION)
        this.payload = new ErrorPayload(errorMessage)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            null, // subId
            this.payload.toObject(),
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 1) {
            return new ErrorResponseV1(this.payload.error)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = ErrorResponseV0