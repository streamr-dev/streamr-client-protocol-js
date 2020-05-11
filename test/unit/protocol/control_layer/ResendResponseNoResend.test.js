import assert from 'assert'

import ResendResponseNoResend from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResend'
import ResendResponseNoResendSerializerV1 from '../../../../src/protocol/control_layer/resend_response_no_resend/ResendResponseNoResendSerializerV1'

describe('ResendResponseNoResend', () => {
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendResponseNoResend.create('streamId', 0, 'requestId')
            assert(msg instanceof ResendResponseNoResendSerializerV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.requestId, 'requestId')
        })
    })
})
