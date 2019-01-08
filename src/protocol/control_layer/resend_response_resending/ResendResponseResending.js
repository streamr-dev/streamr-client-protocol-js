import ControlMessage from '../ControlMessage'

const TYPE = 4

export default class ResendResponseResending extends ControlMessage {
    constructor(version) {
        if (new.target === ResendResponseResending) {
            throw new TypeError('ResendResponseResending is abstract.')
        }
        super(version, TYPE)
    }
}

/* static */ ResendResponseResending.TYPE = TYPE
