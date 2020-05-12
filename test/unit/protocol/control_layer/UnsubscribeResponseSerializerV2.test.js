import assert from 'assert'

import UnsubscribeResponseSerializerV2
    from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseSerializerV2'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import UnsubscribeResponse from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponse'

const VERSION = 2

// Message definitions
const message = new UnsubscribeResponse(VERSION, 'requestId', 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, UnsubscribeResponse.TYPE, 'requestId', 'streamId', 0])

describe('UnsubscribeResponseSerializerV2', () => {
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
