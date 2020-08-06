import ControlMessage from '../ControlMessage'

import InstructionMessage from './InstructionMessage'

const VERSION = 2

export default class InstructionMessageSerializerV2 {
    static toArray(instructionMessage) {
        return [
            VERSION,
            ControlMessage.TYPES.InstructionMessage,
            instructionMessage.requestId,
            instructionMessage.streamId,
            instructionMessage.streamPartition,
            instructionMessage.nodeAddresses,
            instructionMessage.counter
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
            nodeAddresses,
            counter
        ] = arr

        return new InstructionMessage({
            version, requestId, streamId, streamPartition, nodeAddresses, counter
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.InstructionMessage, InstructionMessageSerializerV2)
