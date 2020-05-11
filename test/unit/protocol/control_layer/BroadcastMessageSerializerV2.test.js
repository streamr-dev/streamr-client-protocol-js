import assert from 'assert'

import BroadcastMessageSerializerV2
    from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessageSerializerV2'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import BroadcastMessage from '../../../../src/protocol/control_layer/broadcast_message/BroadcastMessage'

const VERSION = 2

describe('BroadcastMessageSerializerV2', () => {
    const streamMessage = StreamMessageFactory.deserialize([30, ['streamId', 0, 1529549961116, 0, 'address', 'msg-chain-id'],
        [1529549961000, 0], StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])

    const deserializedMessage = new BroadcastMessage(VERSION, 'requestId', streamMessage)
    const serializedMessage = JSON.stringify([VERSION, BroadcastMessage.TYPE, 'requestId', JSON.parse(streamMessage.serialize())])

    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), deserializedMessage)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages (specific StreamMessage version)', () => {
            assert.deepStrictEqual(deserializedMessage.serialize(VERSION, 30), serializedMessage)
        })

        it('correctly serializes messages (latest StreamMessage version by default)', () => {
            const serializedBroadcastMessage = deserializedMessage.serialize(VERSION)
            const broadcastMessage = ControlMessage.deserialize(serializedBroadcastMessage)
            assert.strictEqual(broadcastMessage.streamMessage.version, StreamMessage.LATEST_VERSION)
        })
    })
})
