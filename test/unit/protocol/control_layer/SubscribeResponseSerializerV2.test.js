import assert from 'assert'

import SubscribeResponseSerializerV2
    from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseSerializerV2'
import SubscribeResponse from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponse'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new SubscribeResponse(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, SubscribeResponse.TYPE, 'requestId', 'streamId', 0])

describe('SubscribeResponseSerializerV2', () => {
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
