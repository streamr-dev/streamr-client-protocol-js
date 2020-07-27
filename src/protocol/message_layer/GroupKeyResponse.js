import { MessageLayer } from '../../index'
import { validateIsArray, validateIsString } from '../../utils/validations'

import GroupKeyMessage from './GroupKeyMessage'

const { StreamMessage } = MessageLayer

export default class GroupKeyResponse extends GroupKeyMessage {
    constructor({ requestId, streamId, encryptedGroupKeys }) {
        super(streamId, StreamMessage.MESSAGE_TYPES.GROUP_KEY_RESPONSE_SIMPLE)

        validateIsString('requestId', requestId)
        this.requestId = requestId

        validateIsArray('encryptedGroupKeys', encryptedGroupKeys)
        this.encryptedGroupKeys = encryptedGroupKeys

        // TODO: validate content of encryptedGroupKeys
    }

    toArray() {
        return [this.requestId, this.streamId, this.encryptedGroupKeys]
    }

    static fromArray(arr) {
        const [requestId, streamId, encryptedGroupKeys] = arr
        return new GroupKeyResponse({
            requestId,
            streamId,
            encryptedGroupKeys,
        })
    }
}

GroupKeyMessage.classByMessageType[StreamMessage.MESSAGE_TYPES.GROUP_KEY_RESPONSE_SIMPLE] = GroupKeyResponse
