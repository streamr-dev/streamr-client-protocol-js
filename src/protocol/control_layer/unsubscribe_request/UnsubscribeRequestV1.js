import UnsubscribeRequestV0 from '../unsubscribe_request/UnsubscribeRequestV0'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnsubscribeRequest from './UnsubscribeRequest'

const VERSION = 1

class UnsubscribeRequestV1 extends UnsubscribeRequest {
    constructor(streamId, streamPartition) {
        super(VERSION, streamId, streamPartition)
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
        if (version === 0) {
            return new UnsubscribeRequestV0(this.streamId, this.streamPartition)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }

    serialize(version = VERSION) {
        if (version === VERSION) {
            return JSON.stringify(this.toArray())
        }
        return this.toOtherVersion(version).serialize()
    }
}

module.exports = UnsubscribeRequestV1
