import assert from 'assert'

import { MessageLayer } from '../../../../src/index'

const { StreamMessage, GroupKeyMessage, GroupKeyAnnounce } = MessageLayer

// Message definitions
const message = new GroupKeyAnnounce({
    streamId: 'streamId',
    encryptedGroupKeys: [['groupKeyId1', 'encryptedGroupKey1'], ['groupKeyId2', 'encryptedGroupKey2']]
})
const serializedMessage = JSON.stringify(['streamId', [['groupKeyId1', 'encryptedGroupKey1'], ['groupKeyId2', 'encryptedGroupKey2']]])

describe('GroupKeyAnnounce', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(GroupKeyMessage.deserialize(serializedMessage, StreamMessage.MESSAGE_TYPES.GROUP_KEY_ANNOUNCE), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(), serializedMessage)
        })
    })
})
