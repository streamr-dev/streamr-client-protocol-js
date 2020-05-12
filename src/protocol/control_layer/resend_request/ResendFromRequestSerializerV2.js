import ControlMessage from '../ControlMessage'

import ResendFromRequest from './ResendFromRequest'

const VERSION = 2

export default class ResendFromRequestSerializerV2 {
    static toArray(resendFromRequest) {
        return [
            VERSION,
            ResendFromRequest.TYPE,
            resendFromRequest.requestId,
            resendFromRequest.streamId,
            resendFromRequest.streamPartition,
            resendFromRequest.fromMsgRef.toArray(),
            resendFromRequest.publisherId,
            resendFromRequest.sessionToken,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            streamId,
            streamPartition,
            fromMsgRef,
            publisherId,
            sessionToken,
        ] = arr

        return new ResendFromRequest(version, requestId, streamId, streamPartition, fromMsgRef, publisherId, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendFromRequest.TYPE, ResendFromRequestSerializerV2)
