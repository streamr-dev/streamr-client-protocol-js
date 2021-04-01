import assert from 'assert'

import { SubscribeResponse, ControlMessage } from '../../../../src/index'
import { PLACEHOLDER_REQUEST_ID_PROTOCOL_V1 } from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new SubscribeResponse({
    version: VERSION,
    streamId: 'streamid',
    streamPartition: 0,
    requestId: PLACEHOLDER_REQUEST_ID_PROTOCOL_V1
})
const serializedMessage = JSON.stringify([VERSION, ControlMessage.TYPES.SubscribeResponse, 'streamid', 0])

describe('SubscribeResponseSerializerV1', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(ControlMessage.deserialize(serializedMessage), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(VERSION), serializedMessage)
        })
    })
})
