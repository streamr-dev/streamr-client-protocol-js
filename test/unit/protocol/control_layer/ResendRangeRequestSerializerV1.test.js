import assert from 'assert'

import ResendRangeRequestSerializerV1
    from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequestSerializerV1'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ResendRangeRequest from '../../../../src/protocol/control_layer/resend_request/ResendRangeRequest'

const VERSION = 1

// Message definitions
const message = new ResendRangeRequest(VERSION,
    'requestId', 'streamId', 0, [132846894, 0],
    [132847000, 0], 'publisherId', 'msgChainId', 'sessionToken')
const serializedMessage = JSON.stringify([VERSION, ResendRangeRequest.TYPE, 'streamId', 0, 'requestId', [132846894, 0], [132847000, 0], 'publisherId', 'msgChainId', 'sessionToken'])

describe('ResendRangeRequestSerializerV1', () => {
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
