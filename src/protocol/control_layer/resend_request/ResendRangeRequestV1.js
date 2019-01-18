import ControlMessage from '../ControlMessage'
import ValidationError from '../../../errors/ValidationError'
import MessageRef from '../../message_layer/MessageRef'
import ResendRangeRequest from './ResendRangeRequest'

const VERSION = 1

export default class ResendRangeRequestV1 extends ResendRangeRequest {
    constructor(streamId, streamPartition, subId, fromMsgRefArgsArray, toMsgRefArgsArray, publisherId, sessionToken) {
        super(VERSION)
        this.streamId = streamId
        this.streamPartition = streamPartition
        this.subId = subId
        this.fromMsgRef = new MessageRef(...fromMsgRefArgsArray)
        this.toMsgRef = new MessageRef(...toMsgRefArgsArray)
        if (this.fromMsgRef.timestamp > this.toMsgRef.timestamp) {
            throw new ValidationError('fromMsgRef.timestamp must be less than or equal to toMsgRef.timestamp')
        }
        this.publisherId = publisherId
        this.sessionToken = sessionToken
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
            this.subId,
            JSON.parse(this.fromMsgRef.serialize(messageLayerVersion)),
            JSON.parse(this.toMsgRef.serialize(messageLayerVersion)),
            this.publisherId,
            this.sessionToken,
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

ControlMessage.registerV1Class(ResendRangeRequest.TYPE, ResendRangeRequestV1)
