import SubscribeRequest from './SubscribeRequest'

const VERSION = 1

class SubscribeRequestV1 extends SubscribeRequest {
    constructor(streamId, streamPartition, sessionToken, apiKey) {
        super(VERSION, streamId, streamPartition, sessionToken, apiKey)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.sessionToken,
            this.apiKey,
        ])
        return array
    }
}

module.exports = SubscribeRequestV1
