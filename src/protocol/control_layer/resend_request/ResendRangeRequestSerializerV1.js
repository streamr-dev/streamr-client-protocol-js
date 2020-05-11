import ControlMessage from '../ControlMessage'

import ResendRangeRequest from './ResendRangeRequest'

const VERSION = 1

export default class ResendRangeRequestSerializerV1 {

    static toArray(resendRangeRequest) {
        return [
            VERSION,
            ResendRangeRequest.TYPE,
            resendRangeRequest.streamId,
            resendRangeRequest.streamPartition,
            resendRangeRequest.requestId,
            resendRangeRequest.fromMsgRef.toArray(),
            resendRangeRequest.toMsgRef.toArray(),
            resendRangeRequest.publisherId,
            resendRangeRequest.msgChainId,
            resendRangeRequest.sessionToken,
        ]
    }

    static serialize(arr) {
        const [
            version,
            type,
            streamId,
            streamPartition,
            requestId,
            fromMsgRef,
            toMsgRef,
            publisherId,
            msgChainId,
            sessionToken,
        ] = arr

        return new ResendRangeRequest(version, requestId, streamId, streamPartition, fromMsgRef, toMsgRef, publisherId, msgChainId, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendRangeRequest.TYPE, ResendRangeRequestSerializerV1)
