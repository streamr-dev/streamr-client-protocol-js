import StreamMessage from '../../message_layer/StreamMessage'
import BroadcastMessage from './BroadcastMessage'

const VERSION = 0

class BroadcastMessageV0 extends BroadcastMessage {
    constructor(streamMessage) {
        super(VERSION, streamMessage)
    }

    toArray(messageLayerVersion = StreamMessage.DEFAULT_VERSION) {
        const array = super.toArray()
        array.push(...[
            null, // subId
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
        ])
        return array
    }
}

module.exports = BroadcastMessageV0
