import ControlMessage from '../ControlMessage'

const TYPE = 6

export default class ResendResponseNoResend extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseNoResend) {
            throw new TypeError('ResendResponseNoResend is abstract.')
        }
        super(version, TYPE)
    }
}

/* static */ ResendResponseNoResend.TYPE = TYPE
