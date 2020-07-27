import assert from 'assert'

import { MessageLayer } from '../../../../src/index'

const { StreamMessage, GroupKeyMessage, GroupKeyResponse } = MessageLayer

// Message definitions
const message = new GroupKeyResponse({
    requestId: 'requestId',
    streamId: 'streamId',
    encryptedGroupKeys: [['groupKeyId1', 'encryptedGroupKey1'], ['groupKeyId2', 'encryptedGroupKey2']]
})
const serializedMessage = JSON.stringify(['requestId', 'streamId', [['groupKeyId1', 'encryptedGroupKey1'], ['groupKeyId2', 'encryptedGroupKey2']]])

describe('GroupKeyResponse', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(GroupKeyMessage.deserialize(serializedMessage, StreamMessage.MESSAGE_TYPES.GROUP_KEY_RESPONSE_SIMPLE), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(), serializedMessage)
        })
    })
})
