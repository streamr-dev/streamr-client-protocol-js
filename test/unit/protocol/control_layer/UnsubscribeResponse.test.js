import assert from 'assert'
import UnsubscribeResponse from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponse'
import UnsubscribeResponseV0 from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseV0'
import UnsubscribeResponseV1 from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('UnsubscribeResponse', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => UnsubscribeResponse.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a SubscribeResponseV0', () => {
            const arr = [null, {
                stream: 'streamId',
                partition: 0,
            }]
            const result = UnsubscribeResponse.deserialize(0, arr)
            assert(result instanceof UnsubscribeResponseV0)
        })
        it('should return a SubscribeResponseV1', () => {
            const arr = ['streamId', 0]
            const result = UnsubscribeResponse.deserialize(1, arr)
            assert(result instanceof UnsubscribeResponseV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = UnsubscribeResponse.create('streamId', 0)
            assert(msg instanceof UnsubscribeResponseV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
        })
    })
})
