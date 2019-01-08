import ControlMessage from '../ControlMessage'

const TYPE = 2

export default class SubscribeResponse extends ControlMessage {
    constructor(version) {
        super(version, TYPE)
    }
}

/* static */ SubscribeResponse.TYPE = TYPE
