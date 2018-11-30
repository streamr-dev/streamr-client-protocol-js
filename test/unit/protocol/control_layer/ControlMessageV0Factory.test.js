import assert from 'assert'
import ControlMessageV0Factory from '../../../../src/protocol/control_layer/ControlMessageV0Factory'
import UnsupportedVersionError from '../../../../src/errors/UnsupportedVersionError'
import PublishRequestV0 from '../../../../src/protocol/control_layer/publish_request/PublishRequestV0'
import SubscribeRequestV0 from '../../../../src/protocol/control_layer/subscribe_request/SubscribeRequestV0'
import UnsubscribeRequestV0 from '../../../../src/protocol/control_layer/unsubscribe_request/UnsubscribeRequestV0'

describe('ControlMessageV0Factory', () => {
    describe('deserialize', () => {
        it('should throw when version not 0', () => {
            const msg = {
                version: 1,
            }
            assert.throws(() => ControlMessageV0Factory.deserialize(msg), (err) => {
                assert(err instanceof UnsupportedVersionError)
                assert.equal(err.version, 1)
                return true
            })
        })
        it('should return a PublishRequestV0', () => {
            const msg = {
                type: 'publish',
                stream: 'streamId',
                authKey: 'authKey',
                sessionToken: 'sessionToken',
                msg: JSON.stringify({
                    foo: 'bar',
                }),
                ts: 1533924184016,
                pkey: 'deviceId',
                addr: 'publisherAddress',
                sigtype: 1,
                sig: 'signature',
            }
            const result = ControlMessageV0Factory.deserialize(JSON.stringify(msg))
            assert(result instanceof PublishRequestV0)
        })
        it('should return a SubscribeRequestV0', () => {
            const msg = {
                type: 'subscribe',
                stream: 'streamId',
                partition: 0,
                authKey: 'authKey',
                sessionToken: 'sessionToken',
            }
            const result = ControlMessageV0Factory.deserialize(JSON.stringify(msg))
            assert(result instanceof SubscribeRequestV0)
        })
        it('should return a UnsubscribeRequestV0', () => {
            const msg = {
                type: 'unsubscribe',
                stream: 'streamId',
                partition: 0,
            }
            const result = ControlMessageV0Factory.deserialize(JSON.stringify(msg))
            assert(result instanceof UnsubscribeRequestV0)
        })
    })
})
