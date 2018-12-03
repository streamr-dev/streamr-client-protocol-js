import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import BroadcastMessage from './BroadcastMessage'
import BroadcastMessageV0 from './BroadcastMessageV0'

const VERSION = 1

class BroadcastMessageV1 extends BroadcastMessage {
    constructor(streamMessageArgsArray) {
        super(VERSION, StreamMessageFactory.deserialize(streamMessageArgsArray))
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(JSON.parse(this.streamMessage.serialize(messageLayerVersion)))
        return array
    }

    toOtherVersion(version) {
        if (version === 0) {
            return new BroadcastMessageV0(this.streamMessage)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = BroadcastMessageV1
