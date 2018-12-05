import UnicastMessage from './UnicastMessage'

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
}

module.exports = UnicastMessageV0
