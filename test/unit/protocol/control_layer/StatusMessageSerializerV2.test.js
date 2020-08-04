import assert from 'assert'

import { ControlLayer } from '../../../../src/index'

const { StatusMessage, ControlMessage } = ControlLayer

const VERSION = 2

// Message definitions
const message = new StatusMessage({
    version: VERSION,
    requestId: 'requestId',
    status: {}
})
const serializedMessage = JSON.stringify([VERSION, ControlMessage.TYPES.StatusMessage, 'requestId', {}])

describe('StatusMessageSerializerV2', () => {
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
