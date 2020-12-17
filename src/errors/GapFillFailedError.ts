import { Todo } from '../sharedTypes'

export default class GapFillFailedError extends Error {

    from: Todo
    to: Todo
    publisherId: Todo
    msgChainId: Todo

    constructor(from: Todo, to: Todo, publisherId: Todo, msgChainId: Todo, nbTrials: Todo) {
        super(`Failed to fill gap between ${from.serialize()} and ${to.serialize()}`
            + ` for ${publisherId}-${msgChainId} after ${nbTrials} trials`)
        this.from = from
        this.to = to
        this.publisherId = publisherId
        this.msgChainId = msgChainId
    }
}
