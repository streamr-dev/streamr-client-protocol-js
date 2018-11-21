import assert from 'assert'
import PublishRequest from '../../../src/protocol/PublishRequest'

describe('PublishRequest', () => {
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
                seq: 0,
                pkey: 'deviceId',
                producer: 'producerAddress',
                sigtype: 1,
                sig: 'signature',
            }
            const result = PublishRequest.deserialize(JSON.stringify(msg))

            assert(result instanceof PublishRequest)
            assert.equal(result.streamId, msg.stream)
            assert.equal(result.apiKey, msg.authKey)
            assert.equal(result.sessionToken, msg.sessionToken)
            assert.equal(result.content, msg.msg)
            assert.equal(result.timestamp, msg.ts)
            assert.equal(result.sequenceNumber, msg.seq)
            assert.equal(result.partitionKey, msg.pkey)
            assert.equal(result.producerId, msg.producer)
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
                seq: 0,
                pkey: 'deviceId',
                producer: 'producerAddress',
                sigtype: 1,
                sig: 'signature',
            }

            const serialized = new PublishRequest(
                'streamId',
                'deviceId',
                1533924184016,
                0,
                'producerAddress',
                'authKey',
                'sessionToken',
                {},
                1,
                'signature',
            ).serialize()

            assert(typeof serialized === 'string')
            assert.deepEqual(msg, JSON.parse(serialized))
        })
    })
})
