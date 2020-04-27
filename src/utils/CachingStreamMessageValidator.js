import memoize from 'promise-memoize'
import StreamMessageValidator from './StreamMessageValidator'

/**
 * A thin wrapper around StreamMessageValidator that adds caching for the following
 * expensive functions passed to the constructor:
 * - isPublisherFn
 * - isSubscriberFn
 *
 * Caching the recoverAddressFn does not make sense, because the input is always unique.
 */
export default class CachingStreamMessageValidator extends StreamMessageValidator {
    /**
     * @param isPublisherFn async function(address, streamId): returns true if address is a permitted publisher on streamId
     * @param isSubscriberFn async function(address, streamId): returns true if address is a permitted subscriber on streamId
     * @param recoverAddressFn function(payload, signature): returns the Ethereum address that signed the payload to generate signature
     * @param cacheTimeoutMillis Number: Cache timeout in milliseconds. Default 15 minutes.
     */
    constructor(
        isPublisherFn, isSubscriberFn, recoverAddressFn,
        cacheTimeoutMillis = 15 * 60 * 1000, cacheErrorsTimeoutMillis = 60 * 1000,
    ) {
        StreamMessageValidator.checkInjectedFunctions(isPublisherFn, isSubscriberFn, recoverAddressFn)
        const memoizeOpts = {
            maxAge: cacheTimeoutMillis,
            maxErrorAge: cacheErrorsTimeoutMillis,
        }
        super(
            memoize(isPublisherFn, memoizeOpts),
            memoize(isSubscriberFn, memoizeOpts),
            recoverAddressFn,
        )
    }
}
