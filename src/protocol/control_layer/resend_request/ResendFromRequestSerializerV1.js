import ControlMessage from '../ControlMessage'

import ResendFromRequest from './ResendFromRequest'

const VERSION = 1

export default class ResendFromRequestSerializerV1 {
    static toArray(resendFromRequest) {
        return [
            VERSION,
            ResendFromRequest.TYPE,
            resendFromRequest.streamId,
            resendFromRequest.streamPartition,
            resendFromRequest.requestId,
            resendFromRequest.fromMsgRef.toArray(),
            resendFromRequest.publisherId,
            null, // msgChainId is in V1 accidentally
            resendFromRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
            requestId,
            fromMsgRef,
            publisherId,
            msgChainId, // unused: in V1 accidentally
            sessionToken,
        ] = arr

        return new ResendFromRequest(version, requestId, streamId, streamPartition, fromMsgRef, publisherId, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendFromRequest.TYPE, ResendFromRequestSerializerV1)
