import {
    validateIsNotEmptyString,
    validateIsNotNullOrUndefined,
} from '../../../utils/validations'
import TrackerMessage from '../TrackerMessage'

export interface Originator {
    peerId: string
    peerType: string
    peerName: string | null
    location: any
}

export default class RelayMessage extends TrackerMessage {

    originator: Originator
    targetNode: string
    subType: string
    data: any

    constructor({
        version = TrackerMessage.LATEST_VERSION,
        requestId,
        originator,
        targetNode,
        subType,
        data
    }: {
        version?: number,
        requestId: string,
        originator: Originator,
        targetNode: string,
        subType: string,
        data: any
    }) {
        super(version, TrackerMessage.TYPES.RelayMessage, requestId)

        validateIsNotNullOrUndefined('originator', originator)
        validateIsNotEmptyString('targetNode', targetNode)
        validateIsNotEmptyString('subType', subType)
        validateIsNotNullOrUndefined('data', data)

        this.originator = originator
        this.targetNode = targetNode
        this.subType = subType
        this.data = data
    }
}
