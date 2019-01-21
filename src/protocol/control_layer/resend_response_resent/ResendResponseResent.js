import ControlMessage from '../ControlMessage'
import ControlMessageFactory from '../ControlMessageFactory'

const TYPE = 5

export default class ResendResponseResent extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseResent) {
            throw new TypeError('ResendResponseResent is abstract.')
        }
        super(version, TYPE)
    }

    static create(streamId, streamPartition, subId) {
        return new (ControlMessage.getClass(1, TYPE))(streamId, streamPartition, subId)
    }

    static deserialize(messageVersion, resendResponseResentSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(resendResponseResentSpecificArgsArray))
    }
}

/* static */ ResendResponseResent.TYPE = TYPE
ControlMessageFactory.registerFactory(ResendResponseResent.TYPE, ResendResponseResent)
