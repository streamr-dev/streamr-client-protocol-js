import memoize from 'memoizee'
import StreamMessageValidator from './StreamMessageValidator'

/**
 * A thin wrapper around StreamMessageValidator that adds caching for the following
 * expensive functions passed to the constructor:
 * - getStreamFn
 * - isPublisherFn
 * - recoverAddressFn
 *
 * Caching the recoverAddressFn does not make sense, because the input is always unique.
 */
export default class CachingStreamMessageValidator extends StreamMessageValidator {
    /**
     * @param getStreamFn async function(streamId): returns the stream metadata object for streamId
     * @param isPublisherFn async function(address, streamId): returns true if address is a permitted publisher on streamId
     * @param isSubscriberFn async function(address, streamId): returns true if address is a permitted subscriber on streamId
     * @param recoverAddressFn function(payload, signature): returns the Ethereum address that signed the payload to generate signature
     * @param cacheTimeoutMillis Number: Cache timeout in milliseconds. Default 15 minutes.
     */
    constructor(getStreamFn, isPublisherFn, isSubscriberFn, recoverAddressFn, cacheTimeoutMillis = 15 * 60 * 1000) {
        StreamMessageValidator.checkInjectedFunctions(getStreamFn, isPublisherFn, isSubscriberFn, recoverAddressFn)
        const memoizeOpts = {
            primitive: true,
            maxAge: cacheTimeoutMillis,
            preFetch: 0.1,
            promise: true,
        }
        super(
            memoize(getStreamFn, {
                ...memoizeOpts,
                length: 1,
            }),
            memoize(isPublisherFn, {
                ...memoizeOpts,
                length: 2,
            }),
            memoize(isSubscriberFn, {
                ...memoizeOpts,
                length: 2,
            }),
            recoverAddressFn,
        )
    }
}
