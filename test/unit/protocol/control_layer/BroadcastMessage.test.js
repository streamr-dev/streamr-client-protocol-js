import assert from 'assert'
import BroadcastMessage from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessage'
import BroadcastMessageV0 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV0'
import BroadcastMessageV1 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'

describe('BroadcastMessage', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => BroadcastMessage.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a BroadcastMessageV0', () => {
            const arr = [null, [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature']]
            const result = BroadcastMessage.deserialize(0, arr)
            assert(result instanceof BroadcastMessageV0)
        })
        it('should return a BroadcastMessageV1', () => {
            const arr = [[30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature']]
            const result = BroadcastMessage.deserialize(1, arr)
            assert(result instanceof BroadcastMessageV1)
        })
    })
    describe('create', () => {
        it('should create the latest version', () => {
            const streamMessage = StreamMessageFactory.deserialize([30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])
            const msg = BroadcastMessage.create(streamMessage)
            assert(msg instanceof BroadcastMessageV1)
            assert(msg.streamMessage instanceof StreamMessage)
        })
    })
})
