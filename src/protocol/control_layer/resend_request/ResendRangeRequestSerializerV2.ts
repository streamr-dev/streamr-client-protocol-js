import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'

import ResendRangeRequest from './ResendRangeRequest'

import { Serializer } from '../../../Serializer'

const VERSION = 2

export default class ResendRangeRequestSerializerV2 extends Serializer<ResendRangeRequest> {
    toArray(resendRangeRequest: ResendRangeRequest) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendRangeRequest,
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

    fromArray(arr: any) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            fromMsgRefArr,
            toMsgRefArr,
            publisherId,
            msgChainId,
            sessionToken,
        ] = arr

        return new ResendRangeRequest({
            version,
            requestId,
            streamId,
            streamPartition,
            // @ts-ignore TODO check
            fromMsgRef: new MessageRef(...fromMsgRefArr),
            // @ts-ignore TODO check
            toMsgRef: new MessageRef(...toMsgRefArr),
            publisherId,
            msgChainId,
            sessionToken
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendRangeRequest, new ResendRangeRequestSerializerV2())
