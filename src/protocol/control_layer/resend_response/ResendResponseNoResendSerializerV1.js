import ControlMessage from '../ControlMessage'

import ResendResponseNoResend from './ResendResponseNoResend'

const VERSION = 1

export default class ResendResponseNoResendSerializerV1 {
    static toArray(resendResponseNoResend) {
        return [
            VERSION,
            ResendResponseNoResend.TYPE,
            resendResponseNoResend.streamId,
            resendResponseNoResend.streamPartition,
            resendResponseNoResend.requestId,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
            requestId,
        ] = arr

        return new ResendResponseNoResend(version, requestId, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, ResendResponseNoResend.TYPE, ResendResponseNoResendSerializerV1)
