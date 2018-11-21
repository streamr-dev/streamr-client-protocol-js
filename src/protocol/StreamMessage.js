class StreamMessage {
    constructor() {
        if (new.target === StreamMessage) {
            throw new TypeError('StreamMessage is abstract.')
        }
    }
}

StreamMessage.CONTENT_TYPES = {
    JSON: 27,
}

module.exports = StreamMessage
