import assert from 'assert'
import ResendRangeRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequestV1'
import MessageID from '../../../../src/protocol/message_layer/MessageID'

describe('ResendRangeRequestV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['subId', ['streamId', 0, 132846894, 0, 'producerId'], ['streamId', 0, 132847000, 0, 'producerId']]
            const result = new ResendRangeRequestV1(...arr)
            assert(result instanceof ResendRangeRequestV1)
            assert.equal(result.subId, 'subId')
            assert(result.fromMsgId instanceof MessageID)
            assert(result.toMsgId instanceof MessageID)
            assert.equal(result.fromMsgId.streamId, 'streamId')
            assert.equal(result.fromMsgId.streamPartition, 0)
            assert.equal(result.fromMsgId.timestamp, 132846894)
            assert.equal(result.fromMsgId.sequenceNumber, 0)
            assert.equal(result.fromMsgId.producerId, 'producerId')
            assert.equal(result.toMsgId.streamId, 'streamId')
            assert.equal(result.toMsgId.streamPartition, 0)
            assert.equal(result.toMsgId.timestamp, 132847000)
            assert.equal(result.toMsgId.sequenceNumber, 0)
            assert.equal(result.toMsgId.producerId, 'producerId')
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, 13, 'subId', ['streamId', 0, 132846894, 0, 'producerId'], ['streamId', 0, 132847000, 0, 'producerId']]
            const serialized = new ResendRangeRequestV1(
                'subId', ['streamId', 0, 132846894, 0, 'producerId'],
                ['streamId', 0, 132847000, 0, 'producerId'],
            ).serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
