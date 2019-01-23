import ControlMessage from '../ControlMessage'

const TYPE = 4

export default class ResendResponseResending extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseResending) {
            throw new TypeError('ResendResponseResending is abstract.')
        }
        super(version, TYPE)
    }

    static create(streamId, streamPartition, subId) {
        return new (ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE))(streamId, streamPartition, subId)
    }

    static deserialize(messageVersion, resendResponseResendingSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(resendResponseResendingSpecificArgsArray))
    }
}

/* static */ ResendResponseResending.TYPE = TYPE
ControlMessage.registerFactory(ResendResponseResending.TYPE, ResendResponseResending)
