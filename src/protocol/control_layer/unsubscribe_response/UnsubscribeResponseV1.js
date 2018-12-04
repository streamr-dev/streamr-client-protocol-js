import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnsubscribeResponse from './UnsubscribeResponse'
import UnsubscribeResponseV0 from './UnsubscribeResponseV0'

const VERSION = 1

class UnsubscribeResponseV1 extends UnsubscribeResponse {
    constructor(streamId, streamPartition) {
        super(VERSION)
        this.streamId = streamId
        this.streamPartition = streamPartition
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 1) {
            return new UnsubscribeResponseV0(this.streamId, this.streamPartition)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = UnsubscribeResponseV1
