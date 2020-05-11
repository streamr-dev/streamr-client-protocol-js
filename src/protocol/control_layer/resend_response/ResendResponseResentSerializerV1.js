import ControlMessage from '../ControlMessage'

import ResendResponseResent from './ResendResponseResent'

const VERSION = 1

export default class ResendResponseResentSerializerV1 {

    static toArray(resendResponseResent) {
        return [
            VERSION,
            ResendResponseResent.TYPE,
            resendResponseResent.streamId,
            resendResponseResent.streamPartition,
            resendResponseResent.requestId,
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

        return new ResendResponseResent(version, requestId, streamId, streamPartition)
    }
}

ControlMessage.registerSerializer(VERSION, ResendResponseResent.TYPE, ResendResponseResentSerializerV1)
