import assert from 'assert'

import BroadcastMessageSerializerV1
    from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageSerializerV1'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import BroadcastMessage from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessage'

const streamMessage = StreamMessageFactory.deserialize([30, ['streamId', 0, 1529549961116, 0, 'address', 'msg-chain-id'],
    [1529549961000, 0], StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])

const VERSION = 1

// Message definitions
const message = new BroadcastMessage(VERSION, null, streamMessage)
const serializedMessage = JSON.stringify([VERSION, BroadcastMessage.TYPE, JSON.parse(streamMessage.serialize())])

describe('BroadcastMessageSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages (specific StreamMessage version)', () => {
            assert.deepStrictEqual(message.serialize(VERSION, 30), serializedMessage)
        })

        it('correctly serializes messages (latest StreamMessage version by default)', () => {
            const serializedBroadcastMessage = message.serialize(VERSION)
            const broadcastMessage = ControlMessage.deserialize(serializedBroadcastMessage)
            assert.strictEqual(broadcastMessage.streamMessage.version, StreamMessage.LATEST_VERSION)
        })
    })
})
