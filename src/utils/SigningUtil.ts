// @ts-nocheck
import secp256k1 from 'secp256k1'
import { Keccak } from 'sha3'
import { Todo } from "../sharedTypes"

const SIGN_MAGIC = '\u0019Ethereum Signed Message:\n'
const keccak = new Keccak(256)

function hash(messageBuffer: Todo) {
    const prefixString = SIGN_MAGIC + messageBuffer.length
    const merged = Buffer.concat([Buffer.from(prefixString, 'utf-8'), messageBuffer])
    keccak.reset()
    keccak.update(merged)
    return keccak.digest('binary')
}

function recoverPublicKey(signatureBuffer: Todo, payloadBuffer: Todo) {
    const recoveryId = signatureBuffer.readUInt8(signatureBuffer.length - 1) - 27
    return secp256k1.ecdsaRecover(
        signatureBuffer.subarray(0, signatureBuffer.length - 1),
        recoveryId,
        hash(payloadBuffer),
        false,
        // @ts-ignore TODO: figure out why the library doesn't agree on this parameter
        Buffer.alloc,
    )
}

export default class SigningUtil {
    static async sign(payload: Todo, privateKey: Todo) {
        const payloadBuffer = Buffer.from(payload, 'utf-8')
        const privateKeyBuffer = Buffer.from(privateKey, 'hex')

        const msgHash = hash(payloadBuffer)
        const sigObj = secp256k1.ecdsaSign(msgHash, privateKeyBuffer)
        const result = Buffer.alloc(sigObj.signature.length + 1, Buffer.from(sigObj.signature))
        result.writeInt8(27 + sigObj.recid, result.length - 1)
        return '0x' + result.toString('hex')
    }

    static async recover(signature: Todo, payload: Todo, publicKeyBuffer: Todo = undefined) {
        const signatureBuffer = Buffer.from(signature.substring(2), 'hex') // remove '0x' prefix
        const payloadBuffer = Buffer.from(payload, 'utf-8')

        if (!publicKeyBuffer) {
            // eslint-disable-next-line no-param-reassign
            publicKeyBuffer = recoverPublicKey(signatureBuffer, payloadBuffer)
        }
        const pubKeyWithoutFirstByte = publicKeyBuffer.subarray(1, publicKeyBuffer.length)
        keccak.reset()
        keccak.update(pubKeyWithoutFirstByte)
        const hashOfPubKey = keccak.digest('binary')
        return '0x' + hashOfPubKey.subarray(12, hashOfPubKey.length).toString('hex')
    }

    static async verify(address: Todo, payload: Todo, signature: Todo) {
        try {
            const recoveredAddress = await SigningUtil.recover(signature, payload)
            return recoveredAddress.toLowerCase() === address.toLowerCase()
        } catch (err) {
            return false
        }
    }
}
