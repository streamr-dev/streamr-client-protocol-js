import UnsubscribeRequestV0 from '../unsubscribe_request/UnsubscribeRequestV0'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnsubscribeRequest from './UnsubscribeRequest'

const VERSION = 1

export default class UnsubscribeRequestV1 extends UnsubscribeRequest {
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
}

module.exports = UnsubscribeRequestV1
