import assert from 'assert'
import UnicastMessageFactory from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageFactory'
import UnicastMessageV0 from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageV0'
import UnicastMessageV1 from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageV1'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'

describe('UnicastMessageFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            assert.throws(() => UnicastMessageFactory.deserialize(123, undefined), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a UnicastMessageV0', () => {
            const arr = ['subId', [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature']]
            const result = UnicastMessageFactory.deserialize(0, arr)
            assert(result instanceof UnicastMessageV0)
        })
        it('should return a UnicastMessageV1', () => {
            const arr = ['subId', [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature']]
            const result = UnicastMessageFactory.deserialize(1, arr)
            assert(result instanceof UnicastMessageV1)
        })
    })
})
