import { validateIsNotNullOrUndefined } from '../../../utils/validations'
import TrackerMessage from '../TrackerMessage'

export default class StatusMessage extends TrackerMessage {

    status: any

    constructor({ version = TrackerMessage.LATEST_VERSION, requestId, status }: { version?: number, requestId: string, status: any }) {
        super(version, TrackerMessage.TYPES.StatusMessage, requestId)

        validateIsNotNullOrUndefined('status', status)

        this.status = status
    }
}
