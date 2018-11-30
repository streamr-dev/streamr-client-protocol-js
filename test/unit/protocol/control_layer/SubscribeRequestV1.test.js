import assert from 'assert'
import SubscribeRequest from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequest'
import SubscribeRequestV1 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV1'

describe('SubscribeRequestV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['streamId', 0, 'sessionToken', 'apiKey']
            const result = new SubscribeRequestV1(...arr)
            assert.equal(result.streamId, 'streamId')
            assert.equal(result.streamPartition, 0)
            assert.equal(result.sessionToken, 'sessionToken')
            assert.equal(result.apiKey, 'apiKey')
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, SubscribeRequest.TYPE, 'streamId', 0, 'sessionToken', 'apiKey']

            const serialized = new SubscribeRequestV1('streamId', 0, 'sessionToken', 'apiKey').serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
