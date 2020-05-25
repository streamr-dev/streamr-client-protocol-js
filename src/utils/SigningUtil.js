import secp256k1 from 'secp256k1'
import { Keccak } from 'sha3'

const SIGN_MAGIC = '\u0019Ethereum Signed Message:\n'
const keccak = new Keccak(256)

function hash(messageBuffer) {
    const prefixString = SIGN_MAGIC + messageBuffer.length
    const merged = Buffer.concat([Buffer.from(prefixString, 'utf-8'), messageBuffer])
    keccak.reset()
    keccak.update(merged)
    return keccak.digest('binary')
}

function recoverPublicKey(signatureBuffer, payloadBuffer) {
    const recoveryId = signatureBuffer.readUInt8(signatureBuffer.length - 1) - 27
    return secp256k1.ecdsaRecover(
        signatureBuffer.subarray(0, signatureBuffer.length - 1),
        recoveryId,
        hash(payloadBuffer),
        false,
        Buffer.alloc,
    )
}

export default class SigningUtil {
    static sign(payload, privateKey) {
        const payloadBuffer = Buffer.from(payload, 'utf-8')
        const privateKeyBuffer = Buffer.from(privateKey, 'hex')

        const msgHash = hash(payloadBuffer)
        const sigObj = secp256k1.ecdsaSign(msgHash, privateKeyBuffer)
        const result = Buffer.alloc(sigObj.signature.length + 1, sigObj.signature)
        result.writeInt8(27 + sigObj.recid, result.length - 1)
        return '0x' + result.toString('hex')
    }

    static recover(signature, payload, publicKeyBuffer = undefined) {
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

    static verify(address, payload, signature) {
        const recoveredAddress = SigningUtil.recover(signature, payload)
        return recoveredAddress.toLowerCase() === address.toLowerCase()
    }

    /*
    // TODO: for some reason using ecdsaVerify returns true for invalid signatures, need to find out why
    verify(address, payload, signature) {
        const lowerCaseAddress = address.toLowerCase()
        const signatureBuffer = Buffer.from(signature.substring(2), 'hex') // remove '0x' prefix and last byte
        const payloadBuffer = Buffer.from(payload, 'utf-8')

        // Is the public key cached?
        let publicKeyBuffer = this.publicKeyCache.get(lowerCaseAddress)
        if (!publicKeyBuffer) {
            // Recover public key and cache it
            publicKeyBuffer = recoverPublicKey(signatureBuffer, payloadBuffer)
            this.publicKeyCache.put(lowerCaseAddress, publicKeyBuffer)
        }

        return secp256k1.ecdsaVerify(
            signatureBuffer.subarray(0, signatureBuffer.length - 1), // last byte is the recoveryId, not used here
            hash(payloadBuffer),
            publicKeyBuffer
        )
    }
     */
}
