import ControlMessage from '../ControlMessage'

const TYPE = 2

export default class SubscribeResponse extends ControlMessage {
    constructor(version) {
        super(version, TYPE)
    }

    static create(streamId, streamPartition) {
        return new (ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE))(streamId, streamPartition)
    }

    static deserialize(messageVersion, subscribeResponseSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(subscribeResponseSpecificArgsArray))
    }
}

/* static */ SubscribeResponse.TYPE = TYPE
