import assert from 'assert'

import { StreamMessage, MessageID, MessageRef, GroupKeyMessage, GroupKeyRequest } from '../../../../src/index'

// Message definitions
const message = new GroupKeyRequest({
    requestId: 'requestId',
    streamId: 'streamid',
    rsaPublicKey: 'rsaPublicKey',
    groupKeyIds: ['groupKeyId1', 'groupKeyId2'],
})
const serializedMessage = JSON.stringify(['requestId', 'streamid', 'rsaPublicKey', ['groupKeyId1', 'groupKeyId2']])

const streamMessage = new StreamMessage({
    messageId: new MessageID('streamid', 0, 1, 0, 'publisherId', 'msgChainId'),
    prevMsgRef: new MessageRef(0, 0),
    content: serializedMessage,
    messageType: StreamMessage.MESSAGE_TYPES.GROUP_KEY_REQUEST,
})

describe('GroupKeyRequest', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            assert.deepStrictEqual(GroupKeyMessage.deserialize(serializedMessage, StreamMessage.MESSAGE_TYPES.GROUP_KEY_REQUEST), message)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            assert.deepStrictEqual(message.serialize(), serializedMessage)
        })
    })
    describe('toStreamMessage', () => {
        it('produces the expected StreamMessage', () => {
            assert.deepStrictEqual(message.toStreamMessage(streamMessage.getMessageID(), streamMessage.getPreviousMessageRef()!), streamMessage)
        })
    })
    describe('fromStreamMessage', () => {
        it('produces the expected key exchange message', () => {
            assert.deepStrictEqual(GroupKeyMessage.fromStreamMessage(streamMessage), message)
        })
    })
})
