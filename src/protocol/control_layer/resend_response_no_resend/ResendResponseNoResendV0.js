import ResendResponsePayload from '../ResendResponsePayload'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendResponseNoResend from './ResendResponseNoResend'
import ResendResponseNoResendV1 from './ResendResponseNoResendV1'

const VERSION = 0

class ResendResponseNoResendV0 extends ResendResponseNoResend {
    constructor(streamId, streamPartition, subId) {
        super(VERSION)
        this.payload = new ResendResponsePayload(streamId, streamPartition, subId)
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
            return new ResendResponseNoResendV1(this.payload.streamId, this.payload.streamPartition, this.payload.subId)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }

    static getConstructorArguments(payload) {
        return [payload.streamId, payload.streamPartition, payload.subId]
    }
}

module.exports = ResendResponseNoResendV0
