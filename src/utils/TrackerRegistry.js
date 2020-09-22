import HashRing from 'hashring'
import { Contract, providers } from 'ethers'

const { JsonRpcProvider } = providers

class TrackerRegistry extends HashRing {
    constructor({
        contractAddress, trackerRegistryConfig, jsonRpcProvider, servers, algorithm, hashRingOptions
    }) {
        super(servers, algorithm, hashRingOptions)

        this.contractAddress = contractAddress
        this.trackerRegistryConfig = trackerRegistryConfig
        this.jsonRpcProvider = jsonRpcProvider
    }

    async fetchTrackers() {
        const provider = new JsonRpcProvider(this.jsonRpcProvider)
        // check that provider is connected and has some valid blockNumber
        await provider.getBlockNumber()

        const contract = new Contract(this.contractAddress, this.trackerRegistryConfig.abi, provider)
        // check that contract is connected
        await contract.addressPromise

        if (typeof contract.getNodes !== 'function') {
            throw Error('getNodes is not defined in contract')
        }

        const result = await contract.getNodes()
        result.forEach((tracker) => {
            this.add(tracker.url)
        })
    }

    getTracker(streamKey) {
        return this.get(streamKey)
    }

    getAllTrackers() {
        return Object.keys(this.vnodes)
    }
}

// algorithm is from https://nodejs.org/api/crypto.html or by `openssl list -digest-algorithms`
const getTrackerRegistry = async ({
    contractAddress, trackerRegistryConfig, jsonRpcProvider, servers, algorithm = 'sha256', hashRingOptions
}) => {
    const trackerRegistry = new TrackerRegistry({
        contractAddress, trackerRegistryConfig, jsonRpcProvider, servers, algorithm, hashRingOptions
    })
    await trackerRegistry.fetchTrackers()
    return trackerRegistry
}

export {
    TrackerRegistry,
    getTrackerRegistry
}
