import assert from 'assert'

import SubscribeResponse from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponse'
import SubscribeResponseSerializerV1 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseSerializerV1'

describe('SubscribeResponse', () => {
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = SubscribeResponse.create('streamId', 0)
            assert(msg instanceof SubscribeResponseSerializerV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
        })
    })
})
