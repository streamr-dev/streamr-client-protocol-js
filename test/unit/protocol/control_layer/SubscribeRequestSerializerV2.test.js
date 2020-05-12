import assert from 'assert'

import SubscribeRequest from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequest'
import SubscribeRequestSerializerV2
    from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestSerializerV2'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new SubscribeRequest(VERSION, 'requestId', 'streamId', 0, 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, SubscribeRequest.TYPE, 'requestId', 'streamId', 0, 'sessionToken'])

describe('SubscribeRequestSerializerV2', () => {
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
