// @ts-nocheck
import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'

import ResendRangeRequest from './ResendRangeRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ResendRangeRequestSerializerV1 extends Serializer<Todo> {
    toArray(resendRangeRequest: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendRangeRequest,
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

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
            requestId,
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
            fromMsgRef: new MessageRef(...fromMsgRefArr),
            toMsgRef: new MessageRef(...toMsgRefArr),
            publisherId,
            msgChainId,
            sessionToken
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendRangeRequest, new ResendRangeRequestSerializerV1())
