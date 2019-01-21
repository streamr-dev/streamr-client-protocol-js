import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 9

export default class SubscribeRequest extends ControlMessage {
    constructor(version, streamId, streamPartition, sessionToken) {
        if (new.target === SubscribeRequest) {
            throw new TypeError('SubscribeRequest is abstract.')
        }
        super(version, TYPE)
        this.streamId = streamId
        if (streamPartition == null) {
            throw new ValidationError('Stream partition not given!')
        }
        this.streamPartition = streamPartition
        this.sessionToken = sessionToken
    }

    static create(streamId, streamPartition, sessionToken) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition, sessionToken)
    }

    static deserialize(messageVersion, subscribeRequestSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(subscribeRequestSpecificArgsArray))
    }
}

/* static */ SubscribeRequest.TYPE = TYPE
ControlMessageFactory.registerFactory(SubscribeRequest.TYPE, SubscribeRequest)
ControlMessageFactory.registerFactory('subscribe', SubscribeRequest) // for version 0
