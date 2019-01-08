import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import UnicastMessage from './UnicastMessage'
import UnicastMessageV1 from './UnicastMessageV1'

const VERSION = 0

export default class UnicastMessageV0 extends UnicastMessage {
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
            let streamMsg = this.payload
            if (messageLayerVersion && messageLayerVersion !== this.payload.version) {
                streamMsg = this.payload.toOtherVersion(messageLayerVersion)
            }
            return new UnicastMessageV1(this.subId, streamMsg)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

module.exports = UnicastMessageV0
