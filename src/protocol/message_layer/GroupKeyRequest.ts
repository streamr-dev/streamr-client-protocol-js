import { validateIsArray, validateIsString } from '../../utils/validations'

import GroupKeyMessage from './GroupKeyMessage'
import StreamMessage from './StreamMessage'

export default class GroupKeyRequest extends GroupKeyMessage {

    requestId: string
    rsaPublicKey: string
    groupKeyIds: string[]

    constructor({ requestId, streamId, rsaPublicKey, groupKeyIds }: { requestId: string, streamId: string, rsaPublicKey: string, groupKeyIds: string[]}) {
        super(streamId, StreamMessage.MESSAGE_TYPES.GROUP_KEY_REQUEST)

        validateIsString('requestId', requestId)
        this.requestId = requestId

        validateIsString('rsaPublicKey', rsaPublicKey)
        this.rsaPublicKey = rsaPublicKey

        validateIsArray('groupKeyIds', groupKeyIds)
        this.groupKeyIds = groupKeyIds
    }

    toArray() {
        return [this.requestId, this.streamId, this.rsaPublicKey, this.groupKeyIds]
    }

    static fromArray(arr: any) {
        const [requestId, streamId, rsaPublicKey, groupKeyIds] = arr
        return new GroupKeyRequest({
            requestId,
            streamId,
            rsaPublicKey,
            groupKeyIds,
        })
    }
}

GroupKeyMessage.classByMessageType[StreamMessage.MESSAGE_TYPES.GROUP_KEY_REQUEST] = GroupKeyRequest
