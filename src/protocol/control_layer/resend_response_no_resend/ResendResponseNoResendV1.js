import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ResendResponseNoResend from './ResendResponseNoResend'
import ResendResponseNoResendV0 from './ResendResponseNoResendV0'

const VERSION = 1

class ResendResponseNoResendV1 extends ResendResponseNoResend {
    constructor(streamId, streamPartition, subId) {
        super(VERSION)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.subId = subId
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.subId,
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 0) {
            return new ResendResponseNoResendV0(this.streamId, this.streamPartition, this.subId)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = ResendResponseNoResendV1
