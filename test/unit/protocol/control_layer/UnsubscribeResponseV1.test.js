import assert from 'assert'

import UnsubscribeResponseSerializerV1 from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseSerializerV1'

describe('UnsubscribeResponseSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['streamId', 0]
            const result = new UnsubscribeResponseSerializerV1(...arr)
            assert(result instanceof UnsubscribeResponseSerializerV1)
            assert.equal(result.streamId, 'streamId')
            assert.equal(result.streamPartition, 0)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, 3, 'streamId', 0]
            const serialized = new UnsubscribeResponseSerializerV1('streamId', 0).serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
        it('correctly serializes messages to version 0', () => {
            const arr = [0, 3, null, {
                stream: 'streamId',
                partition: 0,
            }]
            const serialized = new UnsubscribeResponseSerializerV1('streamId', 0).serialize(0)
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
