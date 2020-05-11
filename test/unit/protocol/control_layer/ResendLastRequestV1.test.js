import assert from 'assert'

import ResendLastRequestSerializerV1 from '../../../../src/protocol/control_layer/resend_request/ResendLastRequestSerializerV1'

describe('ResendLastRequestSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const arr = ['streamId', 0, 'requestId', 100, 'sessionToken']
            const result = new ResendLastRequestSerializerV1(...arr)
            assert(result instanceof ResendLastRequestSerializerV1)
            assert.equal(result.streamId, 'streamId')
            assert.equal(result.streamPartition, 0)
            assert.equal(result.requestId, 'requestId')
            assert.equal(result.numberLast, 100)
            assert.equal(result.sessionToken, 'sessionToken')
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const arr = [1, 11, 'streamId', 0, 'requestId', 100, 'sessionToken']
            const serialized = new ResendLastRequestSerializerV1('streamId', 0, 'requestId', 100, 'sessionToken').serialize()
            assert(typeof serialized === 'string')
            assert.deepEqual(arr, JSON.parse(serialized))
        })
    })
})
