import { Todo } from '../../../sharedTypes'
import { validateIsNotNullOrUndefined } from '../../../utils/validations'
import TrackerMessage from '../TrackerMessage'

export default class StatusMessage extends TrackerMessage {

    status: Todo

    constructor({ version = TrackerMessage.LATEST_VERSION, requestId, status }: Todo) {
        super(version, TrackerMessage.TYPES.StatusMessage, requestId)

        validateIsNotNullOrUndefined('status', status)

        this.status = status
    }
}
