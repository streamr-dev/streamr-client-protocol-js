import ControlMessage from '../ControlMessage'

import ResendResponseResending from './ResendResponseResending'

const VERSION = 2

export default class ResendResponseResendingSerializerV2 {
    static toArray(resendResponseResending) {
        return [
            VERSION,
            ResendResponseResending.TYPE,
            resendResponseResending.requestId,
            resendResponseResending.streamId,
            resendResponseResending.streamPartition,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new ResendResponseResending(version, requestId, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, ResendResponseResending.TYPE, ResendResponseResendingSerializerV2)
