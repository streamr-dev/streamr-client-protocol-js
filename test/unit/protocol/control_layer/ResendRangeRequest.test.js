import assert from 'assert'
import ResendRangeRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequestV1'
import ResendRangeRequest from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequest'
import MessageRef from '../../../../src/protocol/message_layer/MessageRef'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendRangeRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendRangeRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendRangeRequestV1', () => {
            const arr = ['streamId', 0, 'subId', [132846894, 0], [132847000, 0], 'publisherId', 'sessionToken']
            const result = ResendRangeRequest.deserialize(1, arr)
            assert(result instanceof ResendRangeRequestV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendRangeRequest.create('streamId', 0, 'subId', [132846894, 0], [132847000, 0], 'publisherId', 'sessionToken')
            assert(msg instanceof ResendRangeRequestV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.subId, 'subId')
            assert(msg.fromMsgRef instanceof MessageRef)
            assert(msg.toMsgRef instanceof MessageRef)
            assert.equal(msg.publisherId, 'publisherId')
            assert.equal(msg.sessionToken, 'sessionToken')
        })
    })
})
