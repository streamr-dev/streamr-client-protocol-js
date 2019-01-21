import assert from 'assert'
import ResendLastRequestV1 from '../../../../src/protocol/control_layer/resend_request/ResendLastRequestV1'
import ResendLastRequest from '../../../../src/protocol/control_layer/resend_request/ResendLastRequest'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('ResendLastRequest', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => ResendLastRequest.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a ResendLastRequestV1', () => {
            const arr = ['streamId', 0, 'subId', 100, 'sessionToken']
            const result = ResendLastRequest.deserialize(1, arr)
            assert(result instanceof ResendLastRequestV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = ResendLastRequest.create('streamId', 0, 'subId', 100, 'sessionToken')
            assert(msg instanceof ResendLastRequestV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
            assert.equal(msg.subId, 'subId')
            assert.equal(msg.numberLast, 100)
            assert.equal(msg.sessionToken, 'sessionToken')
        })
    })
})
