import assert from 'assert'

import UnsubscribeResponse from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponse'
import UnsubscribeResponseSerializerV1 from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseSerializerV1'

describe('UnsubscribeResponse', () => {
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = UnsubscribeResponse.create('streamId', 0)
            assert(msg instanceof UnsubscribeResponseSerializerV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
        })
    })
})
