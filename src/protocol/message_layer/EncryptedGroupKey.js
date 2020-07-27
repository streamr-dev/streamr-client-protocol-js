import { validateIsString } from '../../utils/validations'

export default class EncryptedGroupKey {
    constructor(groupKeyId, encryptedGroupKeyHex) {
        validateIsString('groupKeyId', groupKeyId)
        this.groupKeyId = groupKeyId

        validateIsString('encryptedGroupKeyHex', encryptedGroupKeyHex)
        this.encryptedGroupKeyHex = encryptedGroupKeyHex
    }

    toArray() {
        return [this.groupKeyId, this.encryptedGroupKeyHex]
    }

    static fromArray(arr) {
        const [groupKeyId, encryptedGroupKeyHex] = arr
        return new EncryptedGroupKey(groupKeyId, encryptedGroupKeyHex)
    }
}
