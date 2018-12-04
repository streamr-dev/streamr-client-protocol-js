import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import SubscribeResponse from './SubscribeResponse'
import SubscribeResponseV0 from './SubscribeResponseV0'

const VERSION = 1

class SubscribeResponseV1 extends SubscribeResponse {
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
            return new SubscribeResponseV0(this.streamId, this.streamPartition)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = SubscribeResponseV1
