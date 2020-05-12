import assert from 'assert'

import PublishRequest from '../../../../src/protocol/control_layer/publish_request/PublishRequest'
import PublishRequestSerializerV1 from '../../../../src/protocol/control_layer/publish_request/PublishRequestSerializerV1'
import StreamMessage from '../../../../src/protocol/message_layer/StreamMessage'
import StreamMessageFactory from '../../../../src/protocol/message_layer/StreamMessageFactory'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const streamMessage = StreamMessageFactory.deserialize([30, ['streamId', 0, 1529549961116, 0, 'address', 'msg-chain-id'],
    [1529549961000, 0], StreamMessage.CONTENT_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])

const VERSION = 1

// Message definitions
const message = new PublishRequest(VERSION, null, streamMessage, 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, PublishRequest.TYPE, JSON.parse(streamMessage.serialize()), 'sessionToken'])

describe('PublishRequestSerializerV1', () => {

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
            const serializedPublishRequest = message.serialize(VERSION)
            const publishRequest = ControlMessage.deserialize(serializedPublishRequest)
            assert.strictEqual(publishRequest.streamMessage.version, StreamMessage.LATEST_VERSION)
        })
    })
})
