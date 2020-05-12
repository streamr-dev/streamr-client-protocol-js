import ControlMessage from '../ControlMessage'

import ResendLastRequest from './ResendLastRequest'

const VERSION = 1

export default class ResendLastRequestSerializerV1 {
    static toArray(resendLastRequest) {
        return [
            VERSION,
            ResendLastRequest.TYPE,
            resendLastRequest.streamId,
            resendLastRequest.streamPartition,
            resendLastRequest.requestId,
            resendLastRequest.numberLast,
            resendLastRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
            requestId,
            numberLast,
            sessionToken,
        ] = arr

        return new ResendLastRequest(version, requestId, streamId, streamPartition, numberLast, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendLastRequest.TYPE, ResendLastRequestSerializerV1)
