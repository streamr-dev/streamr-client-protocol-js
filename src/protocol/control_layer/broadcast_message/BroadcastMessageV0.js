import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import BroadcastMessage from './BroadcastMessage'
import BroadcastMessageV1 from './BroadcastMessageV1'

const VERSION = 0

export default class BroadcastMessageV0 extends BroadcastMessage {
    constructor(streamMessage) {
        super(VERSION)
        this.payload = streamMessage
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            null, // subId
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
            return new BroadcastMessageV1(streamMsg)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }
}

ControlMessage.registerClass(VERSION, BroadcastMessage.TYPE, BroadcastMessageV0)
