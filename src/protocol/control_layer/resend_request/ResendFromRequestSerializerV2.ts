import ControlMessage from '../ControlMessage'
import MessageRef from '../../message_layer/MessageRef'

import ResendFromRequest from './ResendFromRequest'

import { Serializer } from '../../../Serializer'

const VERSION = 2

export default class ResendFromRequestSerializerV2 extends Serializer<ResendFromRequest> {
    toArray(resendFromRequest: ResendFromRequest) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendFromRequest,
            resendFromRequest.requestId,
            resendFromRequest.streamId,
            resendFromRequest.streamPartition,
            resendFromRequest.fromMsgRef.toArray(),
            resendFromRequest.publisherId,
            resendFromRequest.sessionToken,
        ]
    }

    fromArray(arr: any) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            fromMsgRefArray,
            publisherId,
            sessionToken,
        ] = arr

        return new ResendFromRequest({
            // @ts-ignore TODO check
            version, requestId, streamId, streamPartition, fromMsgRef: new MessageRef(...fromMsgRefArray), publisherId, sessionToken
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendFromRequest, new ResendFromRequestSerializerV2())
