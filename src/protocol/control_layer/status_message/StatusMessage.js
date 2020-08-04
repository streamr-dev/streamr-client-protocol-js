import { validateIsNotNullOrUndefined } from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

export default class StatusMessage extends ControlMessage {
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, status }) {
        super(version, ControlMessage.TYPES.StatusMessage, requestId)

        validateIsNotNullOrUndefined('status', status)

        this.status = status
    }
}
