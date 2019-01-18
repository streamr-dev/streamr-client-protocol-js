import ResendResponsePayload from '../ResendResponsePayload'
import UnsupportedVersionError from '../../../errors/UnsupportedVersionError'
import ControlMessage from '../ControlMessage'
import ResendResponseResending from './ResendResponseResending'
import ResendResponseResendingV1 from './ResendResponseResendingV1'

const VERSION = 0

export default class ResendResponseResendingV0 extends ResendResponseResending {
    constructor(streamId, streamPartition, subId) {
        super(VERSION)
        this.payload = new ResendResponsePayload(streamId, streamPartition, subId)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            null, // subId
            this.payload.toObject(),
        ])
        return array
    }

    toOtherVersion(version) {
        if (version === 1) {
            return new ResendResponseResendingV1(this.payload.streamId, this.payload.streamPartition, this.payload.subId)
        }
        throw new UnsupportedVersionError(version, 'Supported versions: [0, 1]')
    }

    static getConstructorArguments(payload) {
        return [payload.streamId, payload.streamPartition, payload.subId]
    }
}

ControlMessage.registerClass(VERSION, ResendResponseResending.TYPE, ResendResponseResendingV0)
