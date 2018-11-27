# Protocol

## Layers

The Streamr Protocol is made of three layers:
- **Communication Layer:** Responsible for end-to-end unicast/multicast/broadcast communication primitives in a centralized network or a p2p network. Can be HTTP, Websocket or a custom gossiping protocol.
- **Control Layer:** Defines the control messages allowing communication entities to publish, subscribe, resend, etc... These messages are the payload of the Communication Layer messages.
- **Message Layer:** Defines the potential payload of the control messages. A message contains data and metadata published/consumed on a stream.

The following describes the Control Layer and Message Layer since they are common to any network configuration.

## Control Layer

All messages of the control layer are transmitted as JSON arrays with the following fields : `[version, type, ...typeSpecificFields]`.
`version` describes the version of the Control Layer. `type` is an integer to identify the message type according to the following table: 

messageType | Description
----------- | -----------
0 | BroadcastMessage
1 | UnicastMessage
2 | SubscribeResponse
3 | UnsubscribeResponse
4 | ResendResponseResending
5 | ResendResponseResent
6 | ResendResponseNoResend
7 | ErrorResponse
8 | PublishRequest
9 | SubscribeRequest
10 | UnsubscribeRequest
11 | ResendRequest

We start by describing the requests and then the responses.

### Requests sent

Also see the [Javascript client](https://github.com/streamr-dev/streamr-client) documentation.

#### PublishRequest

Publishes a new message to a stream. Requires a write permission to the stream. Authentication requires either the API key or the session token to be set. It contains a `StreamMessage` as a payload at the Message Layer level. The `StreamMessage` representation is also an array (nested in the `PublishRequest` array) which is described in the Message Layer section.

```
// version, type, streamMessage, apiKey, sessionToken
[1, 8, [...StreamMessageFields], "apiKey", "sessionToken"]
```

Field     | Description
--------- | --------
streamMessage | The array representation of the `StreamMessage` to publish. Defined in the Message Layer.
apiKey   | User's API key or anonymous stream key. Either this or sessionToken must be defined.
sessionToken   | User's session token retrieved with some authentication method. Either this or apiKey must be defined.

#### SubscribeRequest

Requests that the client be subscribed to a stream-partition from the next published message. Will result in a `SubscribeResponse` message, and a stream of `BroadcastMessage` as they are published. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition, apiKey, sessionToken
[1, 9, "streamId", 0, "apiKey", "sessionToken"]
```

Field     | Description
--------- | --------
streamId    | Stream id to subscribe to
streamPartition | Partition id to subscribe to. Optional, defaults to 0
apiKey   | User's API key or anonymous stream key. Optional. Public streams can be subscribed to without authentication.
sessionToken   | User's session token retrieved with some authentication method. Optional. Public streams can be subscribed to without authentication.

#### UnsubscribeRequest

Unsubscribes the client from a stream-partition. The response message is `UnsubscribeResponse`. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition
[1, 10, "streamId", 0]
```

Field     | Description
--------- | --------
streamId    | Stream id to unsubscribe
streamPartition | Partition id to unsubscribe. Optional, defaults to 0

#### ResendRequest

Requests a resend for a stream-partition. Responses are either a sequence of `ResendResponseResending`, one or more `UnicastMessage`, and a `ResendResponseResent`; or a `ResendResponseNoResend` if there is nothing to resend.

```
// version, type, streamId, streamPartition, subId, resend_all, resend_last, resend_from, resend_to
[1, 11, "streamId", 0, "subId", true, 1324, 234, 512]
```

Only one of `resend_all`, `resend_last`, `resend_from` must be set. It doesn't contain any Message Layer payload.

Field     | Description
--------- | --------
streamId     | Stream id to unsubscribe
streamPartition  | Partition id to unsubscribe. Optional, defaults to 0
subId | Subscription id requesting the resend.
resend_all | Set to true to resend all messages in stream
resend_last| Resend the latest N messages
resend_from| Resend all messages from and including the given offset. Can be used in combination with `resend_to`
resend_to  | Resend up to given offset

### Responses sent

#### BroadcastMessage

A message addressed to all subscriptions listening on the stream. It contains a `StreamMessage` as a payload at the Message Layer level. The `StreamMessage` representation is also an array (nested in the `BroadcastMessage` array) which is described in the Message Layer section.

```
// version, type, streamMessage
[1, 0, [...streamMessageFields]]
```

Field     | Description
--------- | --------
streamMessage | the array representation of the `StreamMessage` to be broadcast. Defined in the Message Layer.

#### UnicastMessage

A message addressed to a specific subscription. It contains a `StreamMessage` as a payload at the Message Layer level. The `StreamMessage` representation is also an array (nested in the `UnicastMessage` array) which is described in the Message Layer section.

```
// version, type, subId, streamMessage
[1, 1, 234, [...streamMessageFields]]
```

Field     | Description
--------- | --------
subId | the subscription id to deliver the message to.
streamMessage | the array representation of the `StreamMessage` to be delivered. Defined in the Message Layer.

#### SubscribeResponse

Sent in response to a `SubscribeRequest`. Lets the client know that streams were subscribed to. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition
[1, 2, "streamId", 0]
```

Field     | Description
--------- | --------
streamId     | Stream id subscribed
streamPartition  | Partition id subscribed. Optional, defaults to 0

#### UnsubscribeResponse

Sent in response to an `UnsubscribeRequest`. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition
[1, 3, "streamId", 0]
```

Field     | Description
--------- | --------
streamId     | Stream id unsubscribed
streamPartition  | Partition id unsubscribed. Optional, defaults to 0

#### ResendResponseResending

Sent in response to a `ResendRequest`. Informs the client that a resend is starting. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition
[1, 4, "streamId", 0]
```

Field     | Description
--------- | --------
streamId     | Stream id to resend on.
streamPartition  | Partition id to resend on. Optional, defaults to 0

#### ResendResponseResent

Informs the client that a resend for a particular subscription is complete. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition, subId
[1, 5, "streamId", 0, "subId"]
```

Field     | Description
--------- | --------
streamId     | Stream id of the completed resend.
streamPartition  | Partition id of the completed resend. Optional, defaults to 0
subId | Subscription id for which the resend is complete.

#### ResendResponseNoResend

Sent in response to a `ResendRequest`. Informs the client that there was nothing to resend. It doesn't contain any Message Layer payload.

```
// version, type, streamId, streamPartition
[1, 6, "streamId", 0]
```

Field     | Description
--------- | --------
streamId     | Stream id of resend not executed.
streamPartition  | Partition id of the resend not executed. Optional, defaults to 0

#### ErrorResponse

Sent in case of an error. It doesn't contain any Message Layer payload.

```
// version, type, errorMessage
[1, 7, "errorMessage"]
```

Field     | Description
--------- | --------
errorMessage     | Message of the error.

## Message Layer

The Message Layer contains a single type of message called `StreamMessage`.

### StreamMessage

Contains the data and metadata for a message produced/consumed on a stream. It is a payload at the Control Layer for the following message types: `PublishRequest`, `BroadcastMessage`, `UnicastMessage`.

```
// version, streamId, streamPartition, timestamp, sequenceNumber, producerId, prevTimestamp, prevSequenceNumber, ttl, contentType, content, signatureType, signature
[30, "streamId", "streamPartition", 425354887214, 0, "0xAd23Ba54d26D3f0Ac057...", 425354887001, 0, 120, 27, "contentData", 1, "0x29c057786Fa..."]
```

Field     | Description
--------- | --------
version | Is currently 30
streamId | Stream id this message belongs to
streamPartition | Stream partition this message belongs to
timestamp | Timestamp of the message (milliseconds format)
sequenceNumber | Sequence number of the message within the same timestamp. Defaults to 0.
producerId | Id of the producer of the message. Must be an Ethereum address if the message has an Ethereum signature (signatureType = 1)
prevTimestamp | Timestamp of the previous message published on the same stream and same partition by the same producer.
prevSequenceNumber | Sequence Number of the previous message. With prevTimestamp, the two fields can detect missing messages.
ttl | time-to-live of the message in seconds
contentType | Determines how the content should be parsed.
content | Content data of the message.
signatureType | Signature type as defined by the table below
signature | Signature of the message, signed by the producer. Encoding depends on the signature type.

Signature Type | Description
-------------- | --------
0 | No signature. signature field is empty in this case.
1 | Ethereum signature. signature field is encoded as a hex string.
