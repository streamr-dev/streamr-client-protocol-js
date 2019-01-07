import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnicastMessage from './UnicastMessage'
import UnicastMessageV0 from './UnicastMessageV0'

const VERSION = 1

class UnicastMessageV1 extends UnicastMessage {
    constructor(subId, streamMessage) {
        super(VERSION, subId)
        this.streamMessage = streamMessage
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
        ])
        return array
    }

    toOtherVersion(version, messageLayerVersion) {
        if (version === 0) {
            let streamMsg = this.streamMessage
            if (messageLayerVersion && messageLayerVersion !== this.streamMessage.version) {
                streamMsg = this.streamMessage.toOtherVersion(messageLayerVersion)
            }
            return new UnicastMessageV0(streamMsg, this.subId)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = UnicastMessageV1