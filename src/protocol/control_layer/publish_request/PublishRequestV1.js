import { validateIsNotNullOrUndefined } from '../../../utils/validations'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import ControlMessage from '../ControlMessage'
import PublishRequest from './PublishRequest'

const VERSION = 1

export default class PublishRequestV1 extends PublishRequest {
    constructor(streamMessage, sessionToken) {
        super(VERSION, sessionToken)
        validateIsNotNullOrUndefined('streamMessage', streamMessage)
        this.streamMessage = streamMessage
    }

    getStreamId() {
        return this.streamMessage.getStreamId()
    }

    getStreamMessage() {
        return this.streamMessage
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
            this.sessionToken,
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }

    static getConstructorArgs(array, parseContent = true) {
        const streamMessage = StreamMessageFactory.deserialize(array[0], parseContent)
        return [streamMessage, array[1]]
    }
}

ControlMessage.registerClass(VERSION, PublishRequest.TYPE, PublishRequestV1)
