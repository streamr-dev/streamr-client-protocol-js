import assert from 'assert'

import ResendResponseResent from '../../../../src/protocol/control_layer/resend_response/ResendResponseResent'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('ResendResponseResent', () => {
    describe('constructor', () => {
        it('throws on null requestId', () => {
            assert.throws(() => new ResendResponseResent({
                streamId: 'streamid',
                streamPartition: 0,
            } as any), ValidationError)
        })
        it('should create the latest version', () => {
            const msg = new ResendResponseResent({
                requestId: 'requestId',
                streamId: 'streamid',
                streamPartition: 0,
            } as any)
            assert(msg instanceof ResendResponseResent)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.streamId, 'streamid')
            assert.strictEqual(msg.streamPartition, 0)
            assert.strictEqual(msg.requestId, 'requestId')
        })
    })
})
