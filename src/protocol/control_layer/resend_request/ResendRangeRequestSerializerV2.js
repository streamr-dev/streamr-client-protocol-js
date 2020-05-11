import ControlMessage from '../ControlMessage'

import ResendRangeRequest from './ResendRangeRequest'

const VERSION = 2

export default class ResendRangeRequestSerializerV2 {

    static toArray(resendRangeRequest) {
        return [
            VERSION,
            ResendRangeRequest.TYPE,
            resendRangeRequest.requestId,
            resendRangeRequest.streamId,
            resendRangeRequest.streamPartition,
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
            requestId,
            streamId,
            streamPartition,
            fromMsgRef,
            toMsgRef,
            publisherId,
            msgChainId,
            sessionToken,
        ] = arr

        return new ResendRangeRequest(version, requestId, streamId, streamPartition, fromMsgRef, toMsgRef, publisherId, msgChainId, sessionToken)
    }
}

ControlMessage.registerSerializer(VERSION, ResendRangeRequest.TYPE, ResendRangeRequestSerializerV2)
