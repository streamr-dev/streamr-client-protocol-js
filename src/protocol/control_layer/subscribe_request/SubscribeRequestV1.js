import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import SubscribeRequest from './SubscribeRequest'
import SubscribeRequestV0 from './SubscribeRequestV0'

const VERSION = 1

class SubscribeRequestV1 extends SubscribeRequest {
    constructor(streamId, streamPartition, sessionToken) {
        super(VERSION, streamId, streamPartition, sessionToken)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.sessionToken,
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 0) {
            return new SubscribeRequestV0(this.streamId, this.streamPartition, undefined, this.sessionToken)
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

module.exports = SubscribeRequestV1
