import { validateIsArray, validateIsString } from '../../utils/validations'
import ValidationError from '../../errors/ValidationError'

import StreamMessage from './StreamMessage'
import GroupKeyMessage from './GroupKeyMessage'
import EncryptedGroupKey from './EncryptedGroupKey'
import { Todo } from '../../sharedTypes'

export default class GroupKeyResponse extends GroupKeyMessage {

    requestId: string
    encryptedGroupKeys: EncryptedGroupKey[]

    constructor({ requestId, streamId, encryptedGroupKeys }: { requestId: string, streamId: string, encryptedGroupKeys: EncryptedGroupKey[] }) {
        super(streamId, StreamMessage.MESSAGE_TYPES.GROUP_KEY_RESPONSE)

        validateIsString('requestId', requestId)
        this.requestId = requestId

        validateIsArray('encryptedGroupKeys', encryptedGroupKeys)
        this.encryptedGroupKeys = encryptedGroupKeys

        // Validate content of encryptedGroupKeys
        this.encryptedGroupKeys.forEach((it: EncryptedGroupKey) => {
            if (!(it instanceof EncryptedGroupKey)) {
                throw new ValidationError(`Expected 'encryptedGroupKeys' to be a list of EncryptedGroupKey instances! Was: ${this.encryptedGroupKeys}`)
            }
        })
    }

    toArray() {
        return [this.requestId, this.streamId, this.encryptedGroupKeys.map((it: EncryptedGroupKey) => it.toArray())]
    }

    static fromArray(arr: any) {
        const [requestId, streamId, encryptedGroupKeys] = arr
        return new GroupKeyResponse({
            requestId,
            streamId,
            encryptedGroupKeys: encryptedGroupKeys.map((it: EncryptedGroupKey) => EncryptedGroupKey.fromArray(it)),
        })
    }
}

GroupKeyMessage.classByMessageType[StreamMessage.MESSAGE_TYPES.GROUP_KEY_RESPONSE] = GroupKeyResponse
