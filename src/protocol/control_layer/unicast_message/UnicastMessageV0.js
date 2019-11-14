import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnicastMessage from './UnicastMessage'
import UnicastMessageV1 from './UnicastMessageV1'

const VERSION = 0

export default class UnicastMessageV0 extends UnicastMessage {
    constructor(streamMessage, requestId) {
        super(VERSION, requestId)
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
            return new UnicastMessageV1(this.requestId, streamMsg)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }

    static getConstructorArgs(array) {
        const requestId = array[0]
        const streamMessageArray = array[1]
        const streamMessage = StreamMessageFactory.deserialize(streamMessageArray)
        return [streamMessage, requestId]
    }
}

ControlMessage.registerClass(VERSION, UnicastMessage.TYPE, UnicastMessageV0)
