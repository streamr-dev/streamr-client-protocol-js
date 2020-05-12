import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { UnsubscribeRequest, ControlMessage } = ControlLayer

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
