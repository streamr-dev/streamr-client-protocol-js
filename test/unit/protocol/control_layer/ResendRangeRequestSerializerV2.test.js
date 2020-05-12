import assert from 'assert'

import ResendRangeRequestSerializerV2
    from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequestSerializerV2'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ResendRangeRequest from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequest'

const VERSION = 2

// Message definitions
const message = new ResendRangeRequest(VERSION,
    'requestId', 'streamId', 0, [132846894, 0],
    [132847000, 0], 'publisherId', 'msgChainId', 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, ResendRangeRequest.TYPE, 'requestId', 'streamId', 0, [132846894, 0], [132847000, 0], 'publisherId', 'msgChainId', 'sessionToken'])

describe('ResendRangeRequestSerializerV2', () => {
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
