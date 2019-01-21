import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 3

export default class UnsubscribeResponse extends ControlMessage {
    constructor(version) {
        if (new.target === UnsubscribeResponse) {
            throw new TypeError('UnsubscribeResponse is abstract.')
        }
        super(version, TYPE)
    }

    static create(streamId, streamPartition) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition)
    }

    static deserialize(messageVersion, subscribeResponseSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(subscribeResponseSpecificArgsArray))
    }
}

/* static */ UnsubscribeResponse.TYPE = TYPE
ControlMessageFactory.registerFactory(UnsubscribeResponse.TYPE, UnsubscribeResponse)
