import {
    validateIsNotEmptyString,
    validateIsNotNegativeInteger,
    validateIsArray
} from '../../../utils/validations'
import ControlMessage from '../ControlMessage'

export default class InstructionMessage extends ControlMessage {
    constructor({ version = ControlMessage.LATEST_VERSION, requestId, streamId, streamPartition, nodeAddresses }) {
        super(version, ControlMessage.TYPES.InstructionMessage, requestId)

        validateIsNotEmptyString('streamId', streamId)
        validateIsNotNegativeInteger('streamPartition', streamPartition)
        validateIsArray('nodeAddresses', nodeAddresses)

        this.streamId = streamId
        this.streamPartition = streamPartition
        this.nodeAddresses = nodeAddresses
    }
}
