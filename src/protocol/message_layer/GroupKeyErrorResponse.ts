import { validateIsArray, validateIsString } from '../../utils/validations'

import StreamMessage from './StreamMessage'
import GroupKeyMessage from './GroupKeyMessage'
import { Todo } from '../../sharedTypes'

export default class GroupKeyErrorResponse extends GroupKeyMessage {

    requestId: string
    errorCode: string
    errorMessage: string
    groupKeyIds: Todo
    
    constructor({
        requestId, streamId, errorCode, errorMessage, groupKeyIds
    }: Todo) {
        super(streamId, StreamMessage.MESSAGE_TYPES.GROUP_KEY_ERROR_RESPONSE)

        validateIsString('requestId', requestId)
        this.requestId = requestId

        validateIsString('errorCode', errorCode)
        this.errorCode = errorCode

        validateIsString('errorMessage', errorMessage)
        this.errorMessage = errorMessage

        validateIsArray('groupKeyIds', groupKeyIds)
        this.groupKeyIds = groupKeyIds
    }

    toArray() {
        return [this.requestId, this.streamId, this.errorCode, this.errorMessage, this.groupKeyIds]
    }

    static fromArray(arr: Todo) {
        const [requestId, streamId, errorCode, errorMessage, groupKeyIds] = arr
        return new GroupKeyErrorResponse({
            requestId,
            streamId,
            errorCode,
            errorMessage,
            groupKeyIds,
        })
    }
}

GroupKeyMessage.classByMessageType[StreamMessage.MESSAGE_TYPES.GROUP_KEY_ERROR_RESPONSE] = GroupKeyErrorResponse
