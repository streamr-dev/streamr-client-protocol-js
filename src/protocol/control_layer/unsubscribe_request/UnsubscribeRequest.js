import ValidationError from '../../../errors/ValidationError'
import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 10

export default class UnsubscribeRequest extends ControlMessage {
    constructor(version, streamId, streamPartition) {
        if (new.target === UnsubscribeRequest) {
            throw new TypeError('UnSubscribeRequest is abstract.')
        }
        super(version, TYPE)
        this.streamId = streamId
        if (streamPartition == null) {
            throw new ValidationError('Stream partition not given!')
        }
        this.streamPartition = streamPartition
    }

    static create(streamId, streamPartition) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition)
    }

    static deserialize(messageVersion, unsubscribeRequestSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(unsubscribeRequestSpecificArgsArray))
    }
}

/* static */ UnsubscribeRequest.TYPE = TYPE
ControlMessageFactory.registerFactory(UnsubscribeRequest.TYPE, UnsubscribeRequest)
ControlMessageFactory.registerFactory('unsubscribe', UnsubscribeRequest)
