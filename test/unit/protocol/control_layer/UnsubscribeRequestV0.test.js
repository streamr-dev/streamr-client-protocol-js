import assert from 'assert'
import UnsubscribeRequestV0 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestV0'

describe('UnsubscribeRequest', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const msg = {
                type: 'unsubscribe',
                stream: 'id',
                partition: 0,
            }
            const result = new UnsubscribeRequestV0(...UnsubscribeRequestV0.getConstructorArguments(msg))
            assert(result instanceof UnsubscribeRequestV0)
            assert.equal(result.streamId, msg.stream)
            assert.equal(result.streamPartition, msg.partition)
        })
    })

    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const msg = {
                type: 'unsubscribe',
                stream: 'id',
                partition: 0,
            }
            const serialized = new UnsubscribeRequestV0('id', 0).serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(msg, JSON.parse(serialized))
        })
    })
})
