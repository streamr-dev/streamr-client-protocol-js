import assert from 'assert'

import SubscribeRequest from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequest'
import SubscribeRequestSerializerV1 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestSerializerV1'

describe('SubscribeRequest', () => {
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = SubscribeRequest.create('streamId', 0, 'sessionToken')
            assert(msg instanceof SubscribeRequestSerializerV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.sessionToken, 'sessionToken')
        })
    })
})
