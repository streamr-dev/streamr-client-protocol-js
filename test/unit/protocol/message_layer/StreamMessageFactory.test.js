import assert from 'assert'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import PublishRequestV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV1'
import BroadcastMessageV1 from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageV1'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageV28 from '../../../../src/protocol/message_layer/StreamMessageV28'
import StreamMessageV29 from '../../../../src/protocol/message_layer/StreamMessageV29'
import StreamMessageV30 from '../../../../src/protocol/message_layer/StreamMessageV30'
import StreamMessageV31 from '../../../../src/protocol/message_layer/StreamMessageV31'
import InvalidJsonError from '../../../../src/errors/InvalidJsonError'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
// import { ControlLayer } from 'streamr-client-protocol'
import { ControlLayer } from '../../../../src/index'

describe('StreamMessageFactory', () => {
    describe('deserialize', () => {
        it('should throw when unsupported version', () => {
            const arr = [123]
            assert.throws(() => StreamMessageFactory.deserialize(arr), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 123)
                return true
            })
        })
        it('should create a StreamMessageV28', () => {
            const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}']
            const result = StreamMessageFactory.deserialize(arr)
            assert(result instanceof StreamMessageV28)
        })
        it('throws if the content is invalid', () => {
            const arr = [28, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0,
                941516902, 941499898, StreamMessage.CONTENT_TYPES.MESSAGE, '{"invalid\njson"}']
            assert.throws(() => StreamMessageFactory.deserialize(arr), (err) => {
                assert(err instanceof InvalidJsonError)
                assert.equal(err.streamId, 'TsvTbqshTsuLg_HyUjxigA')
                assert.equal(err.jsonString, '{"invalid\njson"}')
                assert(err.streamMessage instanceof StreamMessage)
                return true
            })
        })
        it('should create a StreamMessageV29', () => {
            const arr = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 941516902, 941499898,
                StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'address', 'signature']
            const result = StreamMessageFactory.deserialize(arr)
            assert(result instanceof StreamMessageV29)
        })
        it('should create a StreamMessageV30', () => {
            const arr = [30, ['TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 'address', 'msgChainId'], [1529549961000, 0],
                StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature']
            const result = StreamMessageFactory.deserialize(arr)
            assert(result instanceof StreamMessageV30)
        })
        it('should create a StreamMessageV29 with parsedContent = false', () => {
            const arr = [29, 'TsvTbqshTsuLg_HyUjxigA', 0, 1529549961116, 0, 941516902, 941499898,
                StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'address', 'signature']
            const result = StreamMessageFactory.deserialize(arr, false)
            assert(result instanceof StreamMessageV29)

            assert.notEqual(result.content, undefined)
            assert.equal(result.parsedContent, undefined)

            assert.deepEqual(result.getParsedContent(), {
                valid: 'json',
            })

            assert.equal(result.content, undefined)
            assert.deepEqual(result.parsedContent, {
                valid: 'json',
            })
        })
        it('should correctly deserialize StreamMessageV29 with parsedContent = false and create correct BroadcastMessage', () => {
            const json = '[1,8,[31,["kxeE-gyxS8CkuWYlfBKMVg",0,1567671580680,0,' +
                '"0x8a9b2ca74d8c1c095d34de3f3cdd7462a5c9c9f4b84d11270a0ad885958bb963",' +
                '"7kcxFuyOs4ozeAcVfzJF"],[1567671579675,0],27,0,"{\\"random\\": 0.8314497807870005}",0,null],' +
                '"kuC8Ilzt2NURdpKxuYN2JBLkPQBJ0vN7NGIx5ohA7ZJafyh29I07fZR57Jq4fUBo"]'

            const PARSE_CONTENT = false

            // PARSE_CONTENT = true and any version - works ok
            // PARSE_CONTENT = false and the same version = 31 - works ok
            // PARSE_CONTENT = false and the different version = 30 - works no

            const request = ControlLayer.ControlMessage.deserialize(json, PARSE_CONTENT)
            assert(request instanceof PublishRequestV1)
            const streamMessage = request.getStreamMessage()
            assert(streamMessage instanceof StreamMessageV31)
            // console.log(streamMessage)
            // console.log(request.serialize(31))

            // const broadcastMessage = ControlLayer.BroadcastMessage.create(streamMessage)
            // assert(broadcastMessage instanceof BroadcastMessageV1)

            const newRequest = ControlLayer.ControlMessage.deserialize(request.serialize(30), PARSE_CONTENT)
            assert(newRequest instanceof PublishRequestV1)
            // console.log(newRequest.serialize(31))
            const newStreamMessage = request.getStreamMessage()
            assert(newStreamMessage instanceof StreamMessageV31)

            console.log(newStreamMessage)
            // console.log(newRequest.serialize(31))
        })
    })
})
