import TrackersRing from '../../../src/utils/TrackersRing'

describe('TrackersRing', () => {
    it('construct with one server', () => {
        const trackersRing = new TrackersRing('ws://1.1.1.1')

        expect(trackersRing.has('ws://1.1.1.1')).toBeTruthy()
        expect(trackersRing.has('ws://1.1.1.2')).toBeFalsy()
    })

    it('construct with list of servers', () => {
        const trackersRing = new TrackersRing(['ws://1.1.1.1', 'ws://1.1.1.2'])

        expect(trackersRing.has('ws://1.1.1.1')).toBeTruthy()
        expect(trackersRing.has('ws://1.1.1.2')).toBeTruthy()
    })

    it('add/remove servers', () => {
        const trackersRing = new TrackersRing(['ws://1.1.1.1', 'ws://1.1.1.2'])

        trackersRing.remove('ws://1.1.1.2')
        expect(trackersRing.has('ws://1.1.1.2')).toBeFalsy()

        trackersRing.add('ws://1.1.1.2')
        expect(trackersRing.has('ws://1.1.1.2')).toBeTruthy()

        trackersRing.reset()
        expect(trackersRing.has('ws://1.1.1.1')).toBeFalsy()
        expect(trackersRing.has('ws://1.1.1.2')).toBeFalsy()
    })

    it('get tracker by stream key', () => {
        const trackersRing = new TrackersRing(['ws://1.1.1.1', 'ws://1.1.1.2', 'ws://1.1.1.3'])

        expect(trackersRing.get('stream-1::0')).toEqual('ws://1.1.1.3')
        expect(trackersRing.get('stream-2::0')).toEqual('ws://1.1.1.1')
        expect(trackersRing.get('stream-5::0')).toEqual('ws://1.1.1.2')

        trackersRing.remove('ws://1.1.1.3')
        expect(trackersRing.get('stream-1::0')).toEqual('ws://1.1.1.2')
        expect(trackersRing.get('stream-2::0')).toEqual('ws://1.1.1.1')
        expect(trackersRing.get('stream-5::0')).toEqual('ws://1.1.1.2')

        trackersRing.remove('ws://1.1.1.2')
        expect(trackersRing.get('stream-1::0')).toEqual('ws://1.1.1.1')
        expect(trackersRing.get('stream-2::0')).toEqual('ws://1.1.1.1')
        expect(trackersRing.get('stream-5::0')).toEqual('ws://1.1.1.1')

        trackersRing.remove('ws://1.1.1.1')
        expect(trackersRing.get('stream-1::0')).toBeUndefined()
        expect(trackersRing.get('stream-2::0')).toBeUndefined()
        expect(trackersRing.get('stream-5::0')).toBeUndefined()
    })
})
