import assert from 'assert'

import UnsubscribeResponseSerializerV1
    from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponseSerializerV1'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import UnsubscribeResponse from '../../../../src/protocol/control_layer/unsubscribe_response/UnsubscribeResponse'

const VERSION = 1

// Message definitions
const message = new UnsubscribeResponse(VERSION, null, 'streamId', 0)
const serializedMessage = JSON.stringify([VERSION, UnsubscribeResponse.TYPE, 'streamId', 0])

describe('UnsubscribeResponseSerializerV1', () => {
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
