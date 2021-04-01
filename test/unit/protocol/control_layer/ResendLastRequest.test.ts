import assert from 'assert'

import ResendLastRequest from '../../../../src/protocol/control_layer/resend_request/ResendLastRequest'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('ResendLastRequest', () => {
    describe('constructor', () => {
        it('throws on null requestId', () => {
            assert.throws(() => new ResendLastRequest({
                requestId: null as any,
                streamId: 'streamid',
                streamPartition: 0,
                numberLast: 100,
                sessionToken: 'sessionToken',
            }), ValidationError)
        })
        it('should create the latest version', () => {
            const msg = new ResendLastRequest({
                requestId: 'requestId',
                streamId: 'streamid',
                streamPartition: 0,
                numberLast: 100,
                sessionToken: 'sessionToken',
            })
            assert(msg instanceof ResendLastRequest)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.streamId, 'streamid')
            assert.strictEqual(msg.streamPartition, 0)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.strictEqual(msg.numberLast, 100)
            assert.strictEqual(msg.sessionToken, 'sessionToken')
        })
    })
})
