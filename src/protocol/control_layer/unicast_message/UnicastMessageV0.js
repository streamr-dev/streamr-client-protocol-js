import UnicastMessage from './UnicastMessage'

const VERSION = 0

class UnicastMessageV0 extends UnicastMessage {
    constructor(streamMessage, subId) {
        super(VERSION, subId, streamMessage)
    }
}

module.exports = UnicastMessageV0
