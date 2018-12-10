import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnicastMessage from './UnicastMessage'
import UnicastMessageV1 from './UnicastMessageV1'

const VERSION = 0

class UnicastMessageV0 extends UnicastMessage {
    constructor(streamMessage, subId) {
        super(VERSION, subId)
        this.payload = streamMessage
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            JSON.parse(this.payload.serialize(messageLayerVersion)),
        ])
        return array
    }

    toOtherVersion(version, messageLayerVersion) {
        if (version === 1) {
            return new UnicastMessageV1(this.subId, this.payload.serialize(messageLayerVersion))
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = UnicastMessageV0
