import assert from 'assert'

import UnsubscribeRequest from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequest'
import UnsubscribeRequestSerializerV1
    from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestSerializerV1'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'

const VERSION = 1

// Message definitions
const message = new UnsubscribeRequest(VERSION, null, 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, UnsubscribeRequest.TYPE, 'streamId', 0])

describe('UnsubscribeRequestSerializerV1', () => {
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
