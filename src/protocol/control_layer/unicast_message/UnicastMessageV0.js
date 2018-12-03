import UnicastMessage from './UnicastMessage'

const VERSION = 0

class UnicastMessageV0 extends UnicastMessage {
    constructor(streamMessage, subId) {
        super(VERSION, streamMessage, subId)
    }
}

module.exports = UnicastMessageV0
