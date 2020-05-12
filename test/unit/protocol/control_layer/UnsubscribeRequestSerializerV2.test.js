import assert from 'assert'

import UnsubscribeRequest from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequest'
import UnsubscribeRequestSerializerV2
    from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestSerializerV2'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 2

// Message definitions
const message = new UnsubscribeRequest(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, UnsubscribeRequest.TYPE, 'requestId', 'streamId', 0])

describe('UnsubscribeRequestSerializerV2', () => {
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
