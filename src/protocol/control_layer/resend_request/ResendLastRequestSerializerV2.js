import ControlMessage from '../ControlMessage'

import ResendLastRequest from './ResendLastRequest'

const VERSION = 2

export default class ResendLastRequestSerializerV2 {
    static toArray(resendLastRequest) {
        return [
            VERSION,
            ResendLastRequest.TYPE,
            resendLastRequest.requestId,
            resendLastRequest.streamId,
            resendLastRequest.streamPartition,
            resendLastRequest.numberLast,
            resendLastRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            numberLast,
            sessionToken,
        ] = arr

        return new ResendLastRequest(version, requestId, streamId, streamPartition, numberLast, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendLastRequest.TYPE, ResendLastRequestSerializerV2)
