import assert from 'assert'

import sinon from 'sinon'

import ControlMessage from '../../../../src/protocol/control_layer/ControlMessage'
import UnsupportedTypeError from '../../../../src/errors/UnsupportedTypeError'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import ValidationError from '../../../../src/errors/ValidationError'

const VERSION = 123
const TYPE = 0
const REQUEST_ID = 'requestId'

class TestControlMessage extends ControlMessage {
    // eslint-disable-next-line no-useless-constructor
    constructor(version, type, requestId) {
        super(version, type, requestId)
    }
}

const msg = () => {
    return new TestControlMessage(VERSION, TYPE, REQUEST_ID)
}

describe('ControlMessage', () => {
    let serializer

    beforeEach(() => {
        serializer = {}
        ControlMessage.registerSerializer(VERSION, TYPE, serializer)
    })

    afterEach(() => {
        delete serializer.fromArray
        delete serializer.toArray
    })

    describe('constructor', () => {
        it('is abstract', () => {
            assert.throws(() => new ControlMessage(VERSION, TYPE, REQUEST_ID), TypeError)
        })
        it('validates version', () => {
            assert.throws(() => new TestControlMessage('invalid', TYPE, REQUEST_ID), ValidationError)
        })
        it('validates type', () => {
            assert.throws(() => new TestControlMessage(VERSION, 'invalid', REQUEST_ID), ValidationError)
        })
        it('does not validate requestId on version < 2', () => {
            assert.doesNotThrow(() => new TestControlMessage(1, TYPE, null))
        })
        it('validates requestId on version >= 2', () => {
            assert.throws(() => new TestControlMessage(2, TYPE, null), ValidationError)
        })
    })

    describe('registerSerializer', () => {
        it('registers a Serializer retrievable by getSerializer()', () => {
            ControlMessage.registerSerializer(666, 0, serializer)
            assert.strictEqual(ControlMessage.getSerializer(666, 0), serializer)
        })
    })

    describe('serialize', () => {
        it('calls toArray() on the configured serializer and stringifies it', () => {
            const m = msg()
            serializer.toArray = sinon.stub().returns([12345])
            assert.strictEqual(m.serialize(), '[12345]')
            assert(serializer.toArray.calledWith(m))
        })

        it('should throw on unsupported version', () => {
            const m = new TestControlMessage(999, TYPE, REQUEST_ID)
            assert.throws(() => m.serialize(), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.strictEqual(err.version, 999)
                return true
            })
        })

        it('should throw on unsupported type', () => {
            const m = new TestControlMessage(VERSION, 999, REQUEST_ID)
            assert.throws(() => m.serialize(), (err) => {
                assert(err instanceof UnsupportedTypeError)
                assert.strictEqual(err.type, 999)
                return true
            })
        })
    })

    describe('deserialize', () => {
        it('parses the input, reads version and type, and calls fromArray() on the configured serializer', () => {
            const arr = [VERSION, TYPE]
            const m = msg()
            serializer.fromArray = sinon.stub().returns(m)
            assert.strictEqual(ControlMessage.deserialize(JSON.stringify(arr)), m)
            assert(serializer.fromArray.calledWith(arr))
        })

        it('should throw on unsupported version', () => {
            const arr = [999, TYPE]
            assert.throws(() => ControlMessage.deserialize(JSON.stringify(arr)), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.strictEqual(err.version, 999)
                return true
            })
        })

        it('should throw on unsupported type', () => {
            const arr = [VERSION, 999]
            assert.throws(() => ControlMessage.deserialize(JSON.stringify(arr)), (err) => {
                assert(err instanceof UnsupportedTypeError)
                assert.strictEqual(err.type, 999)
                return true
            })
        })
    })
})
