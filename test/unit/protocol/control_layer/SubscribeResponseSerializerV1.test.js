import assert from 'assert'

import SubscribeResponseSerializerV1
    from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponseSerializerV1'
import SubscribeResponse from '../../../../src/protocol/control_layer/subscribe_response/SubscribeResponse'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new SubscribeResponse(VERSION, null, 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, SubscribeResponse.TYPE, 'streamId', 0])

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
