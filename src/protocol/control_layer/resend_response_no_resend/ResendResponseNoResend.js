import ControlMessage from '../ControlMessage'

const TYPE = 6

export default class ResendResponseNoResend extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseNoResend) {
            throw new TypeError('ResendResponseNoResend is abstract.')
        }
        super(version, TYPE)
    }

    static create(streamId, streamPartition, subId) {
        return new (ControlMessage.getClass(ControlMessage.LATEST_VERSION, TYPE))(streamId, streamPartition, subId)
    }

    static deserialize(messageVersion, resendResponseNoResendSpecificArgsArray) {
        const C = ControlMessage.getClass(messageVersion, TYPE)
        return new C(...C.getConstructorArgs(resendResponseNoResendSpecificArgsArray))
    }
}

/* static */ ResendResponseNoResend.TYPE = TYPE
