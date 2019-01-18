import assert from 'assert'
import SubscribeResponse from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponse'
import SubscribeResponseV0 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseV0'
import SubscribeResponseV1 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'

describe('SubscribeResponse', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => SubscribeResponse.deserialize(123, undefined), (err) => {
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
            const result = SubscribeResponse.deserialize(0, arr)
            assert(result instanceof SubscribeResponseV0)
        })
        it('should return a SubscribeResponseV1', () => {
            const arr = ['streamId', 0]
            const result = SubscribeResponse.deserialize(1, arr)
            assert(result instanceof SubscribeResponseV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const msg = SubscribeResponse.create('streamId', 0)
            assert(msg instanceof SubscribeResponseV1)
            assert.equal(msg.streamId, 'streamId')
            assert.equal(msg.streamPartition, 0)
        })
    })
})
