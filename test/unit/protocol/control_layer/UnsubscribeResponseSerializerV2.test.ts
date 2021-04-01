import assert from 'assert'

import { UnsubscribeResponse, ControlMessage } from '../../../../src/index'

const VERSION = 2

// Message definitions
const message = new UnsubscribeResponse({
    version: VERSION,
    requestId: 'requestId',
    streamId: 'streamid',
    streamPartition: 0,
})
const serializedMessage = JSON.stringify([VERSION, ControlMessage.TYPES.UnsubscribeResponse, 'requestId', 'streamid', 0])

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
