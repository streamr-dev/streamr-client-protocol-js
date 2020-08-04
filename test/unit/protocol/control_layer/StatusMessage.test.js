import assert from 'assert'

import StatusMessage from '../../../../src/protocol/control_layer/status_message/StatusMessage'
import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import ValidationError from '../../../../src/errors/ValidationError'

describe('StatusMessage', () => {
    describe('constructor', () => {
        it('throws on null status', () => {
            assert.throws(() => new StatusMessage({
                requestId: 'requestId',
                status: null
            }), ValidationError)
        })
        it('throws on missing status', () => {
            assert.throws(() => new StatusMessage({
                requestId: 'requestId',
            }), ValidationError)
        })
        it('throws on null requestId', () => {
            assert.throws(() => new StatusMessage({
                requestId: null,
                status: {}
            }), ValidationError)
        })
        it('should create the latest version', () => {
            const msg = new StatusMessage({
                requestId: 'requestId',
                streamId: 'streamId',
                status: {}
            })
            assert(msg instanceof StatusMessage)
            assert.strictEqual(msg.version, ControlMessage.LATEST_VERSION)
            assert.strictEqual(msg.requestId, 'requestId')
            assert.deepStrictEqual(msg.status, {})
        })
    })
})
