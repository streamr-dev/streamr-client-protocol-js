import assert from 'assert'

import SubscribeResponseSerializerV1 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseSerializerV1'

describe('SubscribeResponseSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['streamId', 0]
            const result = new SubscribeResponseSerializerV1(...arr)
            assert(result instanceof SubscribeResponseSerializerV1)
            assert.equal(result.streamId, 'streamId')
            assert.equal(result.streamPartition, 0)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, 2, 'streamId', 0]
            const serialized = new SubscribeResponseSerializerV1('streamId', 0).serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
        it('correctly serializes messages to version 0', () => {
            const arr = [0, 2, null, {
                stream: 'streamId',
                partition: 0,
            }]
            const serialized = new SubscribeResponseSerializerV1('streamId', 0).serialize(0)
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
