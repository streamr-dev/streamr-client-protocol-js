import StreamMessage from '../protocol/message_layer/StreamMessage'
import ValidationError from '../errors/ValidationError'

const KEY_EXCHANGE_STREAM_PREFIX = 'SYSTEM/keyexchange/'

/**
 * Validates observed StreamMessages according to protocol rules, regardless of observer.
 * Functions needed for external interactions are injected as constructor args.
 *
 * The recoverAddressFn function could be imported from eg. ethers, but it would explode the bundle size, so
 * better leave it up to whoever is the end user of this class to choose which library they use.
 */
export default class StreamMessageValidator {
    /**
     * @param getStreamFn async function(streamId): returns the stream metadata object for streamId
     * @param isPublisherFn async function(address, streamId): returns true if address is a permitted publisher on streamId
     * @param isSubscriberFn async function(address, streamId): returns true if address is a permitted subscriber on streamId
     * @param recoverAddressFn function(payload, signature): returns the Ethereum address that signed the payload to generate signature
     */
    constructor(getStreamFn, isPublisherFn, isSubscriberFn, recoverAddressFn) {
        this.getStream = getStreamFn || throw new Error('getStream must be: async function(streamId): returns the stream metadata object for streamId')
        this.isPublisher = isPublisherFn || throw new Error('async function(address, streamId): returns true if address is a permitted publisher on streamId')
        this.isSubscriber = isSubscriberFn || throw new Error('async function(address, streamId): returns true if address is a permitted subscriber on streamId')
        this.recoverAddress = recoverAddressFn || throw new Error('function(payload, signature): returns the Ethereum address that signed the payload to generate signature')
    }

    /**
     * Checks that the given StreamMessage is satisfies the requirements of the protocol.
     * This includes checking permissions as well as signature. The method supports all
     * content types defined by the protocol.
     *
     * Resolves the promise if the message is valid, rejects otherwise.
     *
     * @param streamMessage the StreamMessage to validate.
     */
    async validate(streamMessage) {
        switch (streamMessage.contentType) {
            case StreamMessage.CONTENT_TYPES.MESSAGE:
                return this._validateMessage(streamMessage)
            case StreamMessage.CONTENT_TYPES.GROUP_KEY_REQUEST:
                return this._validateGroupKeyRequest(streamMessage)
            case StreamMessage.CONTENT_TYPES.GROUP_KEY_RESPONSE_SIMPLE:
            case StreamMessage.CONTENT_TYPES.GROUP_KEY_RESET_SIMPLE:
                return this._validateGroupKeyResponseOrReset(streamMessage)
            default:
                throw new ValidationError(`Unknown content type: ${streamMessage.contentType}!`)
        }
    }

    /**
     * Checks that the signature in the given StreamMessage is cryptographically valid.
     * Resolves if valid, rejects otherwise.
     *
     * It's left up to the user of this method to decide which implementation to pass in as the recoverFn.
     *
     * @param streamMessage the StreamMessage to validate.
     * @param recoverFn function(payload, signature): returns the Ethereum address that signed the payload to generate signature
     */
    static checkSignature(streamMessage, recoverFn) {
        const payload = streamMessage.getPayloadToSign()

        if (streamMessage.signatureType === StreamMessage.SIGNATURE_TYPES.ETH_LEGACY
            || streamMessage.signatureType === StreamMessage.SIGNATURE_TYPES.ETH) {
            try {
                const recoveredAddress = recoverFn(payload, streamMessage.signature)
                if (recoveredAddress.toLowerCase() !== streamMessage.getPublisherId().toLowerCase()) {
                    throw new ValidationError(`Signature validation failed for message! Recovered address: ${recoveredAddress}, message: ${streamMessage.serialize()}`)
                }
            } catch (err) {
                throw new ValidationError(`Signature validation failed for message! An error occurred: ${err}`)
            }
        } else {
            // We should never end up here, as StreamMessage construction throws if the signature type is invalid
            throw new ValidationError(`Unrecognized signature type: ${streamMessage.signatureType}`)
        }
    }

    async _validateMessage(streamMessage) {
        if (!streamMessage.signature) {
            // Check that not having a signature is ok
            const stream = await this.getStream(streamMessage.getStreamId())
            if (stream.requireSignedData) {
                throw new ValidationError(`Stream requires signed data but message was not signed: ${streamMessage.serialize()}`)
            }
        } else {
            StreamMessageValidator.checkSignature(streamMessage, this.recoverAddress)
            const sender = streamMessage.getPublisherId()

            // Check that the sender of the message is a valid publisher of the stream
            const senderIsPublisher = await this.isPublisher(sender, streamMessage.getStreamId())
            if (!senderIsPublisher) {
                throw new ValidationError(`${sender} is not a publisher on stream ${streamMessage.getStreamId()}. Message: ${streamMessage.serialize()}`)
            }
        }
    }

    async _validateGroupKeyRequest(streamMessage) {
        if (!streamMessage.signature) {
            throw new ValidationError(`Received unsigned group key request (the public key must be signed to avoid MitM attacks). Message: ${streamMessage.serialize()}`)
        }
        if (!streamMessage.getStreamId().startsWith(KEY_EXCHANGE_STREAM_PREFIX)) {
            throw new ValidationError(`Group key requests can only occur on stream ids of form ${`${KEY_EXCHANGE_STREAM_PREFIX}{address}`}. Message: ${streamMessage.serialize()}`)
        }

        const request = streamMessage.getParsedContent()
        const sender = streamMessage.getPublisherId()
        const recipient = streamMessage.getStreamId().substring(KEY_EXCHANGE_STREAM_PREFIX.length)

        StreamMessageValidator.checkSignature(streamMessage, this.recoverAddress)

        // Check that the recipient of the request is a valid publisher of the stream
        const recipientIsPublisher = await this.isPublisher(recipient, request.streamId)
        if (!recipientIsPublisher) {
            throw new ValidationError(`${recipient} is not a publisher on stream ${request.streamId}. Group key request: ${streamMessage.serialize()}`)
        }

        // Check that the sender of the request is a valid subscriber of the stream
        const senderIsSubscriber = await this.isSubscriber(sender, request.streamId)
        if (!senderIsSubscriber) {
            throw new ValidationError(`${sender} is not a publisher on stream ${request.streamId}. Group key request: ${streamMessage.serialize()}`)
        }
    }

    async _validateGroupKeyResponseOrReset(streamMessage) {
        if (!streamMessage.signature) {
            throw new ValidationError(`Received unsigned group key response (it must be signed to avoid MitM attacks). Message: ${streamMessage.serialize()}`)
        }
        if (!streamMessage.getStreamId().startsWith(KEY_EXCHANGE_STREAM_PREFIX)) {
            throw new ValidationError(`Group key responses can only occur on stream ids of form ${`${KEY_EXCHANGE_STREAM_PREFIX}{address}`}. Message: ${streamMessage.serialize()}`)
        }

        StreamMessageValidator.checkSignature(streamMessage, this.recoverAddress)

        const response = streamMessage.getParsedContent()
        const sender = streamMessage.getPublisherId()
        const recipient = streamMessage.getStreamId().substring(KEY_EXCHANGE_STREAM_PREFIX.length)

        // Check that the sender of the request is a valid publisher of the stream
        const senderIsPublisher = await this.isPublisher(sender, response.streamId)
        if (!senderIsPublisher) {
            throw new ValidationError(`${sender} is not a publisher on stream ${response.streamId}. Group key response: ${streamMessage.serialize()}`)
        }

        // Check that the recipient of the request is a valid subscriber of the stream
        const recipientIsPublisher = await this.isSubscriber(recipient, response.streamId)
        if (!recipientIsPublisher) {
            throw new ValidationError(`${recipient} is not a subscriber on stream ${response.streamId}. Group key response: ${streamMessage.serialize()}`)
        }
    }
}
