import TimestampUtil from '../utils/TimestampUtil'
import ValidationError from '../errors/ValidationError'
import WebsocketRequest from './WebsocketRequest'

const TYPE = 'publish'

class PublishRequest extends WebsocketRequest {
    constructor(streamId, partitionKey, timestamp, sequenceNumber, producerId, apiKey, sessionToken, content, signatureType, signature) {
        super(TYPE, streamId, apiKey, sessionToken)

        if (!content) {
            throw new ValidationError('No content given!')
        }
        this.content = content

        if (timestamp) {
            this.timestamp = TimestampUtil.parse(timestamp)
        }

        this.partitionKey = partitionKey
        this.sequenceNumber = sequenceNumber
        this.producerId = producerId
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
            ...super.toObject(),
            msg: this.getSerializedContent(),
            ts: this.getTimestampAsNumber(),
            seq: this.sequenceNumber,
            pkey: this.partitionKey,
            producer: this.producerId,
            sigtype: this.signatureType,
            sig: this.signature,
        }
    }

    static getConstructorArguments(msg) {
        return [
            msg.stream,
            msg.pkey,
            msg.ts,
            msg.seq,
            msg.producer,
            msg.authKey,
            msg.sessionToken,
            msg.msg,
            msg.sigtype,
            msg.sig,
        ]
    }
}

WebsocketRequest.registerMessageClass(PublishRequest, TYPE)
module.exports = PublishRequest
