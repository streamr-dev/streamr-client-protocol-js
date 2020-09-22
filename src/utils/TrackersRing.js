import HashRing from 'hashring'

export default class TrackersRing extends HashRing {
    // algorithm is from https://nodejs.org/api/crypto.html or by `openssl list -digest-algorithms`
    constructor(servers, algorithm = 'sha256', options) {
        super(servers, algorithm, options)
    }
}
