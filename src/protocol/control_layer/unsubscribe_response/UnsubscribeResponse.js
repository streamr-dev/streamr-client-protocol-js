import ControlMessage from '../ControlMessage'

const TYPE = 3

export default class UnsubscribeResponse extends ControlMessage {
    constructor(version) {
        if (new.target === UnsubscribeResponse) {
            throw new TypeError('UnsubscribeResponse is abstract.')
        }
        super(version, TYPE)
    }
}

/* static */ UnsubscribeResponse.TYPE = TYPE

module.exports = UnsubscribeResponse
