import assert from 'assert'
import PublishRequestV0 from '../../../../src/protocol/control_layer/PublishRequestV0'

describe('PublishRequestV0', () => {
    describe('deserialize', () => {
        it('correctly parses messages', () => {
            const msg = {
                type: 'publish',
                stream: 'streamId',
                authKey: 'authKey',
                sessionToken: 'sessionToken',
                msg: JSON.stringify({
                    foo: 'bar',
                }),
                ts: 1533924184016,
                pkey: 'deviceId',
                addr: 'publisherAddress',
                sigtype: 1,
                sig: 'signature',
            }
            const result = new PublishRequestV0(...PublishRequestV0.getConstructorArguments(msg))
            assert.equal(result.streamId, msg.stream)
            assert.equal(result.apiKey, msg.authKey)
            assert.equal(result.sessionToken, msg.sessionToken)
            assert.equal(result.content, msg.msg)
            assert.equal(result.timestamp, msg.ts)
            assert.equal(result.partitionKey, msg.pkey)
            assert.equal(result.publisherAddress, msg.addr)
            assert.equal(result.signatureType, msg.sigtype)
            assert.equal(result.signature, msg.sig)
        })
    })
    describe('serialize', () => {
        it('correctly serializes messages', () => {
            const msg = {
                type: 'publish',
                stream: 'streamId',
                authKey: 'authKey',
                sessionToken: 'sessionToken',
                msg: '{}',
                ts: 1533924184016,
                pkey: 'deviceId',
                addr: 'publisherAddress',
                sigtype: 1,
                sig: 'signature',
            }

            const serialized = new PublishRequestV0(
                'streamId',
                'authKey',
                'sessionToken',
                {},
                1533924184016,
                'deviceId',
                'publisherAddress',
                1,
                'signature',
            ).serialize()

            assert(typeof serialized === 'string')
            assert.deepEqual(msg, JSON.parse(serialized))
        })
    })
})
