import { MessageLayer } from '../../index'
import { validateIsArray, validateIsString } from '../../utils/validations'

import GroupKeyMessage from './GroupKeyMessage'

const { StreamMessage } = MessageLayer

export default class GroupKeyAnnounce extends GroupKeyMessage {
    constructor({ streamId, encryptedGroupKeys }) {
        super(streamId, StreamMessage.MESSAGE_TYPES.GROUP_KEY_ANNOUNCE)

        validateIsArray('encryptedGroupKeys', encryptedGroupKeys)
        this.encryptedGroupKeys = encryptedGroupKeys

        // TODO: validate content of encryptedGroupKeys
    }

    toArray() {
        return [this.streamId, this.encryptedGroupKeys]
    }

    static fromArray(arr) {
        const [streamId, encryptedGroupKeys] = arr
        return new GroupKeyAnnounce({
            streamId,
            encryptedGroupKeys,
        })
    }
}

GroupKeyMessage.classByMessageType[StreamMessage.MESSAGE_TYPES.GROUP_KEY_ANNOUNCE] = GroupKeyAnnounce
