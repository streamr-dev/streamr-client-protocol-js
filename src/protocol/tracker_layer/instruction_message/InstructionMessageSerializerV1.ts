import TrackerMessage from '../TrackerMessage'

import InstructionMessage from './InstructionMessage'

import { Serializer } from '../../../Serializer'

const VERSION = 1

export default class InstructionMessageSerializerV1 extends Serializer<InstructionMessage> {
    toArray(instructionMessage: InstructionMessage) {
        return [
            VERSION,
            TrackerMessage.TYPES.InstructionMessage,
            instructionMessage.requestId,
            instructionMessage.streamId,
            instructionMessage.streamPartition,
            instructionMessage.nodeIds,
            instructionMessage.counter
        ]
    }

    fromArray(arr: any) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            nodeIds,
            counter
        ] = arr

        return new InstructionMessage({
            version, requestId, streamId, streamPartition, nodeIds, counter
        })
    }
}

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.InstructionMessage, new InstructionMessageSerializerV1())
