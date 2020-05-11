import ControlMessage from '../ControlMessage'

import ResendResponseNoResend from './ResendResponseNoResend'

const VERSION = 2

export default class ResendResponseNoResendSerializerV2 {

    static toArray(resendResponseNoResend) {
        return [
            VERSION,
            ResendResponseNoResend.TYPE,
            resendResponseNoResend.requestId,
            resendResponseNoResend.streamId,
            resendResponseNoResend.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new ResendResponseNoResend(version, requestId, streamId, streamPartition)
    }

}

ControlMessage.registerSerializer(VERSION, ResendResponseNoResend.TYPE, ResendResponseNoResendSerializerV2)
