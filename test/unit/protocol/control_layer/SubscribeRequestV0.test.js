import assert from 'assert'
import SubscribeRequestV0 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV0'

describe('SubscribeRequestV0', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const msg = {
                type: 'subscribe',
                stream: 'streamId',
                partition: 0,
                authKey: 'authKey',
                sessionToken: 'sessionToken',
            }
            const result = new SubscribeRequestV0(...SubscribeRequestV0.getConstructorArguments(msg))

            assert(result instanceof SubscribeRequestV0)
            assert.equal(result.streamId, msg.stream)
            assert.equal(result.streamPartition, msg.partition)
            assert.equal(result.apiKey, msg.authKey)
            assert.equal(result.sessionToken, msg.sessionToken)
        })
    })

    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const msg = {
                type: 'subscribe',
                stream: 'streamId',
                partition: 0,
                authKey: 'authKey',
                sessionToken: 'sessionToken',
            }

            const serialized = new SubscribeRequestV0('streamId', 0, 'authKey', 'sessionToken').serialize()

            assert(typeof serialized === 'string')
            assert.deepEqual(msg, JSON.parse(serialized))
        })
    })
})
