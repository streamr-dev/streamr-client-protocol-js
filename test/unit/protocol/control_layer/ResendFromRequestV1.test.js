import assert from 'assert'
import ResendFromRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestV1'
import MessageID from '../../../../src/protocol/message_layer/MessageID'

describe('ResendFromRequestV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['subId', ['streamId', 0, 132846894, 0, 'producerId']]
            const result = new ResendFromRequestV1(...arr)
            assert(result instanceof ResendFromRequestV1)
            assert.equal(result.subId, 'subId')
            assert(result.msgId instanceof MessageID)
            assert.equal(result.msgId.streamId, 'streamId')
            assert.equal(result.msgId.streamPartition, 0)
            assert.equal(result.msgId.timestamp, 132846894)
            assert.equal(result.msgId.sequenceNumber, 0)
            assert.equal(result.msgId.producerId, 'producerId')
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, 12, 'subId', ['streamId', 0, 132846894, 0, 'producerId']]
            const serialized = new ResendFromRequestV1('subId', ['streamId', 0, 132846894, 0, 'producerId']).serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
