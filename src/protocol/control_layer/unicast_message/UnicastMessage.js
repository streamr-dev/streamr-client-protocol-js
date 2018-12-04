import ControlMessage from '../ControlMessage'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'

const TYPE = 1

class UnicastMessage extends ControlMessage {
    constructor(version, subId, streamMessage) {
        if (new.target === UnicastMessage) {
            throw new TypeError('UnicastMessage is abstract.')
        }
        super(version, TYPE)
        this.subId = subId
        this.streamMessage = streamMessage
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.subId,
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
        ])
        return array
    }

    serialize(controlLayerVersion = this.version, messageLayerVersion) {
        if (controlLayerVersion === 0 || controlLayerVersion === 1) {
            return JSON.stringify(this.toArray(messageLayerVersion))
        }
        throw new UnsupportedVersionError(controlLayerVersion, 'Supported versions: [0, 1]')
    }
}

/* static */ UnicastMessage.TYPE = TYPE

module.exports = UnicastMessage
