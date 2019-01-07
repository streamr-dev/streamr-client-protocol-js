import StreamAndPartition from '../StreamAndPartition'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnsubscribeResponse from './UnsubscribeResponse'
import UnsubscribeResponseV1 from './UnsubscribeResponseV1'

const VERSION = 0

class UnsubscribeResponseV0 extends UnsubscribeResponse {
    constructor(streamId, streamPartition) {
        super(VERSION)
        this.payload = new StreamAndPartition(streamId, streamPartition)
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
            return new UnsubscribeResponseV1(this.payload.streamId, this.payload.streamPartition)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = UnsubscribeResponseV0