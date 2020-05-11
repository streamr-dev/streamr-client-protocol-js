import assert from 'assert'

import UnsubscribeRequest from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequest'
import UnsubscribeRequestSerializerV1 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestSerializerV1'

describe('UnsubscribeRequest', () => {
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = UnsubscribeRequest.create('streamId', 0)
            assert(msg instanceof UnsubscribeRequestSerializerV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
        })
    })
})
