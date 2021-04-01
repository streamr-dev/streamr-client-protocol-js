import assert from 'assert'

import { StreamMessage, UnicastMessage, ControlMessage } from '../../../../src/index'

const streamMessage = StreamMessage.deserialize([30, ['streamid', 0, 1529549961116, 0, 'address', 'msg-chain-id'],
    [1529549961000, 0], StreamMessage.MESSAGE_TYPES.MESSAGE, '{"valid": "json"}', StreamMessage.SIGNATURE_TYPES.ETH, 'signature'])

const VERSION = 1

// Message definitions
const message = new UnicastMessage({
    version: VERSION,
    requestId: 'requestId',
    streamMessage,
})
const serializedMessage = JSON.stringify([VERSION, ControlMessage.TYPES.UnicastMessage, 'requestId', JSON.parse(streamMessage.serialize(30))])

describe('UnicastMessageSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(VERSION, 30), serializedMessage)
        })
    })
})
