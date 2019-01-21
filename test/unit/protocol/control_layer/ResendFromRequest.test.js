import assert from 'assert'
import ResendFromRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendFromRequestV1'
import ResendFromRequest from '../../../../src/protocol/control_layer/resend_request/ResendFromRequest'
import MessageRef from '../../../../src/protocol/message_layer/MessageRef'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendFromRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendFromRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendFromRequestV1', () => {
            const arr = ['streamId', 0, 'subId', [132846894, 0], 'producerId', 'sessionToken']
            const result = ResendFromRequest.deserialize(1, arr)
            assert(result instanceof ResendFromRequestV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendFromRequest.create('streamId', 0, 'subId', [132846894, 0], 'publisherId', 'sessionToken')
            assert(msg instanceof ResendFromRequestV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.subId, 'subId')
            assert(msg.fromMsgRef instanceof MessageRef)
            assert.equal(msg.publisherId, 'publisherId')
            assert.equal(msg.sessionToken, 'sessionToken')
        })
    })
})
