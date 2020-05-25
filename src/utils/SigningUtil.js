import secp256k1 from 'secp256k1'
import { Keccak } from 'sha3'

const SIGN_MAGIC = '\u0019Ethereum Signed Message:\n'
const keccak = new Keccak(256)

export function hash(messageString) {
    const messageBuffer = Buffer.from(messageString, 'utf-8')
    const prefixString = SIGN_MAGIC + messageBuffer.length
    const merged = Buffer.concat([Buffer.from(prefixString, 'utf-8'), messageBuffer])
    keccak.reset()
    keccak.update(merged)
    return keccak.digest('binary')
}

export function sign(payload, privateKey) {
    const privateKeyBuffer = Buffer.from(privateKey, 'hex')
    const msgHash = hash(payload)
    const sigObj = secp256k1.ecdsaSign(msgHash, privateKeyBuffer)
    const result = Buffer.alloc(sigObj.signature.length + 1, sigObj.signature)
    result.writeInt8(27 + sigObj.recid, result.length - 1)
    return '0x' + result.toString('hex')
}

export function recover(signature, payload) {
    const signatureBuffer = Buffer.from(signature.substring(2), 'hex') // remove '0x' prefix
    const recoveryId = signatureBuffer.readUInt8(signatureBuffer.length - 1) - 27
    const publicKey = secp256k1.ecdsaRecover(
        signatureBuffer.subarray(0, signatureBuffer.length - 1),
        recoveryId,
        hash(payload),
        false,
        Buffer.alloc,
    )
    const pubKeyWithoutFirstByte = publicKey.subarray(1, publicKey.length)
    keccak.reset()
    keccak.update(pubKeyWithoutFirstByte)
    const hashOfPubKey = keccak.digest('binary')
    return '0x' + hashOfPubKey.subarray(12, hashOfPubKey.length).toString('hex')
}
