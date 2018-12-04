import assert from 'assert'
import ControlMessageFactory from '../../../../src/protocol/control_layer/ControlMessageFactory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import PublishRequestV0 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV0'
import PublishRequestV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV1'
import SubscribeRequestV0 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV0'
import SubscribeRequestV1 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV1'
import UnsubscribeRequestV0 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestV0'
import UnsubscribeRequestV1 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestV1'
import BroadcastMessageV0 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV0'
import BroadcastMessageV1 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV1'
import UnicastMessageV0 from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageV0'
import UnicastMessageV1 from '../../../../src/protocol/control_layer/unicast_message/UnicastMessageV1'
import SubscribeResponseV0 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseV0'
import SubscribeResponseV1 from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseV1'
import UnsubscribeResponseV0 from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseV0'
import UnsubscribeResponseV1 from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseV1'

describe('ControlMessageFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            const arr = [123]
            assert.throws(() => ControlMessageFactory.deserialize(arr), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should return a PublishRequestV0', () => {
            const msg = {
                type: 'publish',
                stream: 'streamId',
                authKey: 'authKey',
                sessionToken: 'sessionToken',
                msg: JSON.stringify({
                    foo: 'bar',
                }),
                ts: 1533924184016,
                pkey: 'deviceId',
                addr: 'publisherAddress',
                sigtype: 1,
                sig: 'signature',
            }
            const result = ControlMessageFactory.deserialize(JSON.stringify(msg))
            assert(result instanceof PublishRequestV0)
        })
        it('should return a PublishRequestV1', () => {
            const arr = [1, 8, [30, ['streamId', 0, 1529549961116, 0, 'address'],
                [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken', 'apiKey']
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof PublishRequestV1)
        })
        it('should return a SubscribeRequestV0', () => {
            const msg = {
                type: 'subscribe',
                stream: 'streamId',
                partition: 0,
                authKey: 'authKey',
                sessionToken: 'sessionToken',
            }
            const result = ControlMessageFactory.deserialize(JSON.stringify(msg))
            assert(result instanceof SubscribeRequestV0)
        })
        it('should return a SubscribeRequestV1', () => {
            const arr = [1, 9, 'streamId', 0, 'sessionToken', 'apiKey']
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof SubscribeRequestV1)
        })
        it('should return an UnsubscribeRequestV0', () => {
            const msg = {
                type: 'unsubscribe',
                stream: 'id',
                partition: 0,
            }
            const result = ControlMessageFactory.deserialize(JSON.stringify(msg))
            assert(result instanceof UnsubscribeRequestV0)
        })
        it('should return an UnsubscribeRequestV1', () => {
            const arr = [1, 10, 'streamId', 0]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof UnsubscribeRequestV1)
        })
        it('should return a BroadcastMessageV0', () => {
            const arr = [0, 0, null, [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof BroadcastMessageV0)
        })
        it('should return a BroadcastMessageV1', () => {
            const arr = [1, 0, [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof BroadcastMessageV1)
        })
        it('should return a UnicastMessageV0', () => {
            const arr = [0, 1, 'subId', [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof UnicastMessageV0)
        })
        it('should return a UnicastMessageV1', () => {
            const arr = [1, 1, 'subId', [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address'], [1529549961000, 0],
                0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof UnicastMessageV1)
        })
        it('should return a SubscribeResponseV0', () => {
            const arr = [0, 2, null, {
                stream: 'streamId',
                partition: 0,
            }]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof SubscribeResponseV0)
        })
        it('should return a SubscribeResponseV1', () => {
            const arr = [1, 2, 'streamId', 0]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof SubscribeResponseV1)
        })
        it('should return an UnsubscribeResponseV0', () => {
            const arr = [0, 3, null, {
                stream: 'streamId',
                partition: 0,
            }]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof UnsubscribeResponseV0)
        })
        it('should return an UnsubscribeResponseV1', () => {
            const arr = [1, 3, 'streamId', 0]
            const result = ControlMessageFactory.deserialize(arr)
            assert(result instanceof UnsubscribeResponseV1)
        })
    })
})
