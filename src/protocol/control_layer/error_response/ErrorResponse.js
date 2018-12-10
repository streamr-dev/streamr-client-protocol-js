import ControlMessage from '../ControlMessage'

const TYPE = 7

class ErrorResponse extends ControlMessage {
    constructor(version) {
        if (new.target === ErrorResponse) {
            throw new TypeError('ErrorResponse is abstract.')
        }
        super(version, TYPE)
    }
}

/* static */ ErrorResponse.TYPE = TYPE

module.exports = ErrorResponse
