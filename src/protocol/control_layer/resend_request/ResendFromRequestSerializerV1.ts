import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'

import ResendFromRequest from './ResendFromRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ResendFromRequestSerializerV1 extends Serializer<ResendFromRequest> {
    toArray(resendFromRequest: ResendFromRequest) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendFromRequest,
            resendFromRequest.streamId,
            resendFromRequest.streamPartition,
            resendFromRequest.requestId,
            resendFromRequest.fromMsgRef.toArray(),
            resendFromRequest.publisherId,
            null, // msgChainId is in V1 accidentally
            resendFromRequest.sessionToken,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
            requestId,
            fromMsgRefArray,
            publisherId,
            // unused: in V1 accidentally
            msgChainId, // eslint-disable-line no-unused-vars
            sessionToken,
        ] = arr

        return new ResendFromRequest({
            // @ts-ignore TODO check
            version, requestId, streamId, streamPartition, fromMsgRef: new MessageRef(...fromMsgRefArray), publisherId, sessionToken
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendFromRequest, new ResendFromRequestSerializerV1())
