import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import BroadcastMessage from './BroadcastMessage'
import BroadcastMessageV1 from './BroadcastMessageV1'

const VERSION = 0

class BroadcastMessageV0 extends BroadcastMessage {
    constructor(streamMessage) {
        super(VERSION, streamMessage)
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            null, // subId
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 1) {
            return new BroadcastMessageV1(this.streamMessage.serialize())
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = BroadcastMessageV0
