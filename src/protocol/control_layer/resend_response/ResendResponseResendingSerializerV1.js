import ControlMessage from '../ControlMessage'

import ResendResponseResending from './ResendResponseResending'

const VERSION = 1

export default class ResendResponseResendingSerializerV1 {

    static toArray(resendResponseResending) {
        return [
            VERSION,
            ResendResponseResending.TYPE,
            resendResponseResending.streamId,
            resendResponseResending.streamPartition,
            resendResponseResending.requestId,
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

        return new ResendResponseResending(version, requestId, streamId, streamPartition)
    }

}

ControlMessage.registerSerializer(VERSION, ResendResponseResending.TYPE, ResendResponseResendingSerializerV1)
