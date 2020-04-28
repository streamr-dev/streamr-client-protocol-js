import assert from 'assert'
import sinon from 'sinon'
import sleep from 'await-sleep'

import CachingStreamMessageValidator from '../../../src/utils/CachingStreamMessageValidator'
import StreamMessageFactory from '../../../src/protocol/message_layer/StreamMessageFactory'

describe('CachingStreamMessageValidator', () => {
    let timeoutMillis
    let errorTimeoutMillis
    let validator
    let getStream
    let isPublisher
    let isSubscriber
    let recoverAddress
    let msg

    const getValidator = () => new CachingStreamMessageValidator(
        getStream, isPublisher, isSubscriber,
        recoverAddress, timeoutMillis, errorTimeoutMillis,
    )

    beforeEach(() => {
        // Default stubs
        getStream = sinon.stub().resolves({
            partitions: 10,
            requireSignedData: true,
            requireEncryptedData: false,
        })
        isPublisher = sinon.stub().resolves(true)
        isSubscriber = sinon.stub().resolves(true)
        recoverAddress = sinon.stub().returns('0xbce3217F2AC9c8a2D14A6303F87506c4FC124014')
        timeoutMillis = 15 * 60 * 1000

        msg = StreamMessageFactory.deserialize('[31,["tagHE6nTQ9SJV2wPoCxBFw",0,1587141844396,0,"0xbce3217F2AC9c8a2D14A6303F87506c4FC124014","k000EDTMtqOTLM8sirFj"],[1587141844312,0],27,0,"{\\"eventType\\":\\"trade\\",\\"eventTime\\":1587141844398,\\"symbol\\":\\"ETHBTC\\",\\"tradeId\\":172530352,\\"price\\":0.02415,\\"quantity\\":0.296,\\"buyerOrderId\\":687544144,\\"sellerOrderId\\":687544104,\\"time\\":1587141844396,\\"maker\\":false,\\"ignored\\":true}",2,"0x91c47df28dc3014a49ef50313efa8e40015eeeccea0cf006ab2c7b05efbb0ddc7e10e430aaa7ea6dd0ca5e05761eaf0c14c8ca09b57c8d8626da7bb9ea2d50fa1b"]')

        validator = getValidator()
    })

    // Note: this test assumes that the passed getStream, isPublisher, and isSubscriber are cached in the same way.
    // Only validation of normal messages is tested, which uses only isPublisher.

    it('only calls the expensive function once, after the promise of first call has resolved', async () => {
        await validator.validate(msg)
        await validator.validate(msg)
        assert.equal(getStream.callCount, 1) // cached
        assert.equal(isPublisher.callCount, 1) // cached
        assert.equal(recoverAddress.callCount, 2) // not cached
    })

    it('only calls the expensive function once, even while promises are resolving', /* not async! */ () => {
        getStream = sinon.spy(() => new Promise(() => {})) // Never resolves
        validator = getValidator()
        validator.validate(msg)
        validator.validate(msg)
        assert.equal(getStream.callCount, 1)
    })

    it('only calls the expensive function once for each different stream', async () => {
        const msg2 = StreamMessageFactory.deserialize('[31,["streamId",0,1587141844396,0,"0xbce3217F2AC9c8a2D14A6303F87506c4FC124014","k000EDTMtqOTLM8sirFj"],[1587141844312,0],27,0,"{\\"foo\\":\\"bar\\"}",2,"some-signature"]')

        await validator.validate(msg)
        await validator.validate(msg2)

        assert.equal(isPublisher.callCount, 2, `Unexpected calls: ${isPublisher.getCalls()}`)
        assert(isPublisher.calledWith('0xbce3217F2AC9c8a2D14A6303F87506c4FC124014', 'streamId'), `Unexpected calls: ${isPublisher.getCalls()}`)
        assert(isPublisher.calledWith('0xbce3217F2AC9c8a2D14A6303F87506c4FC124014', 'tagHE6nTQ9SJV2wPoCxBFw'), `Unexpected calls: ${isPublisher.getCalls()}`)
    })

    it('expires items from cache after timeout', async () => {
        // Tried sinon fake timers, but for some reason they didn't work. Going with wall-clock time for now.
        timeoutMillis = 1000
        validator = getValidator()

        await validator.validate(msg)
        await validator.validate(msg)
        assert.equal(isPublisher.callCount, 1)

        await sleep(timeoutMillis * 3)

        // Results should have been expired
        await validator.validate(msg)
        await validator.validate(msg)
        assert.equal(isPublisher.callCount, 2)
    })

    it('does not swallow rejections', async () => {
        const testError = new Error('test error')
        isPublisher = sinon.stub().rejects(testError)
        await assert.rejects(getValidator().validate(msg), (err) => {
            assert(err === testError)
            return true
        })
    })

    it('caches errors and expires them with separate timeout', async () => {
        // Tried sinon fake timers, but for some reason they didn't work. Going with wall-clock time for now.
        errorTimeoutMillis = 1000
        const testError = new Error('test error')
        isPublisher = sinon.stub().rejects(testError)

        validator = getValidator()
        await assert.rejects(validator.validate(msg))
        await assert.rejects(validator.validate(msg))
        assert.equal(isPublisher.callCount, 1)

        await sleep(errorTimeoutMillis * 3)

        // Error results should have been expired
        await assert.rejects(validator.validate(msg))
        await assert.rejects(validator.validate(msg))
        assert.equal(isPublisher.callCount, 2)
    })

    // Further tests would basically be just testing the memoizee library. Add more tests if the implementation grows.
})
