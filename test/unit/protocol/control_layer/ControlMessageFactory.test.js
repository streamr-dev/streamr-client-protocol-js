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
import ErrorResponseV0 from '../../../../src/protocol/control_layer/error_response/ErrorResponseV0'
import ErrorResponseV1 from '../../../../src/protocol/control_layer/error_response/ErrorResponseV1'

const examplesByTypeV0 = {
    '0': [0, 0, null, [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
        941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']],
    '1': [0, 1, 'subId', [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
        941516902, 941499898, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}']],
    '2': [0, 2, null, {
        stream: 'id',
        partition: 0,
    }],
    '3': [0, 3, null, {
        stream: 'id',
        partition: 0,
    }],
    '4': [0, 4, null, {
        stream: 'id',
        partition: 0,
        sub: 'subId',
    }],
    '5': [0, 5, null, {
        stream: 'id',
        partition: 0,
        sub: 'subId',
    }],
    '6': [0, 6, null, {
        stream: 'id',
        partition: 0,
        sub: 'subId',
    }],
    '7': [0, 7, null, {
        error: 'foo',
    }],
}

const examplesByTypeV1 = {
    '0': [1, 0, [30, ['streamId', 0, 1529549961116, 0, 'address'],
        [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']],
    '1': [1, 1, 'subId', [30, ['streamId', 0, 1529549961116, 0, 'address'],
        [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature']],
    '2': [1, 2, 'streamId', 0],
    '3': [1, 3, 'streamId', 0],
    '7': [1, 7, 'errorMessage'],
    '8': [1, 8, [30, ['streamId', 0, 1529549961116, 0, 'address'],
        [1529549961000, 0], 0, StreamMessage.CONTENT_TYPES.JSON, '{"valid": "json"}', 1, 'signature'], 'sessionToken', 'apiKey'],
    '9': [1, 9, 'streamId', 0, 'sessionToken', 'apiKey'],
    '10': [1, 10, 'streamId', 0],
}

describe('ControlMessageFactory', () => {
    it('should throw when unsupported version', () => {
        const arr = [123]
        assert.throws(() => ControlMessageFactory.deserialize(arr), (err) => {
            assert(err instanceof UnsupportedVersionError)
            assert.equal(err.version, 123)
            return true
        })
    })
    describe('version 0', () => {
        describe('deserialize', () => {
            let clazz
            let array
            let result
            beforeEach(() => {
                array = null
                clazz = null
            })
            afterEach(() => {
                result = ControlMessageFactory.deserialize(JSON.stringify(array))
                assert(result instanceof clazz)
            })
            /* eslint-disable prefer-destructuring */
            it('BroadcastMessageV0', () => {
                clazz = BroadcastMessageV0
                array = examplesByTypeV0[0]
            })
            it('UnicastMessageV0', () => {
                clazz = UnicastMessageV0
                array = examplesByTypeV0[1]
            })
            it('SubscribeResponseV0', () => {
                clazz = SubscribeResponseV0
                array = examplesByTypeV0[2]
            })
            it('UnsubscribeResponseV0', () => {
                clazz = UnsubscribeResponseV0
                array = examplesByTypeV0[3]
            })
            it('ErrorResponseV0', () => {
                clazz = ErrorResponseV0
                array = examplesByTypeV0[7]
            })
            /* eslint-enable prefer-destructuring */
        })
        describe('serialize', () => {
            let array
            let serialized
            beforeEach(() => {
                array = null
                serialized = null
            })
            afterEach(() => {
                serialized = ControlMessageFactory.deserialize(array).serialize()
                assert(typeof serialized === 'string')
                assert.deepEqual(array, JSON.parse(serialized))
            })
            /* eslint-disable prefer-destructuring */
            it('BroadcastMessageV0', () => {
                array = examplesByTypeV0[0]
            })
            it('UnicastMessageV0', () => {
                array = examplesByTypeV0[1]
            })
            it('SubscribeResponseV0', () => {
                array = examplesByTypeV0[2]
            })
            it('UnsubscribeResponseV0', () => {
                array = examplesByTypeV0[3]
            })
            it('ErrorResponseV0', () => {
                array = examplesByTypeV0[7]
            })
            /* eslint-enable prefer-destructuring */
        })
    })
    describe('version 1', () => {
        describe('deserialize', () => {
            let clazz
            let array
            let result
            beforeEach(() => {
                array = null
                clazz = null
            })
            afterEach(() => {
                result = ControlMessageFactory.deserialize(JSON.stringify(array))
                assert(result instanceof clazz)
            })
            /* eslint-disable prefer-destructuring */
            it('BroadcastMessageV1', () => {
                clazz = BroadcastMessageV1
                array = examplesByTypeV1[0]
            })

            it('UnicastMessageV1', () => {
                clazz = UnicastMessageV1
                array = examplesByTypeV1[1]
            })

            it('SubscribeResponseV1', () => {
                clazz = SubscribeResponseV1
                array = examplesByTypeV1[2]
            })

            it('UnsubscribeResponseV1', () => {
                clazz = UnsubscribeResponseV1
                array = examplesByTypeV1[3]
            })
            it('ErrorResponseV1', () => {
                clazz = ErrorResponseV1
                array = examplesByTypeV1[7]
            })
            it('PublishRequestV1', () => {
                clazz = PublishRequestV1
                array = examplesByTypeV1[8]
            })
            it('SubscribeRequestV1', () => {
                clazz = SubscribeRequestV1
                array = examplesByTypeV1[9]
            })
            it('UnsubscribeRequestV1', () => {
                clazz = UnsubscribeRequestV1
                array = examplesByTypeV1[10]
            })
            /* eslint-enable prefer-destructuring */
        })
        describe('serialize', () => {
            let array
            let serialized
            beforeEach(() => {
                array = null
                serialized = null
            })
            afterEach(() => {
                serialized = ControlMessageFactory.deserialize(array).serialize()
                assert(typeof serialized === 'string')
                assert.deepEqual(array, JSON.parse(serialized))
            })
            /* eslint-disable prefer-destructuring */
            it('BroadcastMessageV1', () => {
                array = examplesByTypeV1[0]
            })
            it('UnicastMessageV1', () => {
                array = examplesByTypeV1[1]
            })
            it('SubscribeResponseV1', () => {
                array = examplesByTypeV1[2]
            })
            it('UnsubscribeResponseV1', () => {
                array = examplesByTypeV1[3]
            })
            it('ErrorResponseV1', () => {
                array = examplesByTypeV1[7]
            })
            it('PublishRequestV1', () => {
                array = examplesByTypeV1[8]
            })
            it('SubscribeRequestV1', () => {
                array = examplesByTypeV1[9]
            })
            it('UnsubscribeRequestV1', () => {
                array = examplesByTypeV1[10]
            })
            /* eslint-enable prefer-destructuring */
        })
    })
    describe('deserialize', () => {
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
        it('should return an UnsubscribeRequestV0', () => {
            const msg = {
                type: 'unsubscribe',
                stream: 'id',
                partition: 0,
            }
            const result = ControlMessageFactory.deserialize(JSON.stringify(msg))
            assert(result instanceof UnsubscribeRequestV0)
        })
    })
})
