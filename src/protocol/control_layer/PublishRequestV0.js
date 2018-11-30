import TimestampUtil from '../../utils/TimestampUtil'
import ValidationError from '../../errors/ValidationError'
import PublishRequest from './PublishRequest'

const VERSION = 0

class PublishRequestV0 extends PublishRequest {
    constructor(streamId, apiKey, sessionToken, content, timestamp, partitionKey, publisherAddress, signatureType, signature) {
        super(VERSION, sessionToken, apiKey)
        this.streamId = streamId

        if (!content) {
            throw new ValidationError('No content given!')
        }
        this.content = content

        if (timestamp) {
            this.timestamp = TimestampUtil.parse(timestamp)
        }

        this.partitionKey = partitionKey
        this.publisherAddress = publisherAddress
        this.signatureType = signatureType
        this.signature = signature
    }

    getTimestampAsNumber() {
        if (this.timestamp) {
            return TimestampUtil.parse(this.timestamp)
        }
        return undefined
    }

    getSerializedContent() {
        if (typeof this.content === 'string') {
            return this.content
        } else if (typeof this.content === 'object') {
            return JSON.stringify(this.content)
        }
        throw new Error('Stream payloads can only be objects!')
    }

    toObject() {
        return {
            type: 'publish',
            stream: this.streamId,
            authKey: this.apiKey,
            sessionToken: this.sessionToken,
            msg: this.getSerializedContent(),
            ts: this.getTimestampAsNumber(),
            pkey: this.partitionKey,
            addr: this.publisherAddress,
            sigtype: this.signatureType,
            sig: this.signature,
        }
    }

    serialize() {
        return JSON.stringify(this.toObject())
    }

    static getConstructorArguments(msg) {
        return [
            msg.stream,
            msg.authKey,
            msg.sessionToken,
            msg.msg,
            msg.ts,
            msg.pkey,
            msg.addr,
            msg.sigtype,
            msg.sig,
        ]
    }
}

module.exports = PublishRequestV0
