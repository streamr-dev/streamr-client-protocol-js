import HashRing from 'hashring'
import { Contract, providers } from 'ethers'

import * as trackerRegistryConfig from '../../contracts/TrackerRegistry.json'

const { JsonRpcProvider } = providers

class TrackerRegistry {
    constructor(servers) {
        for (let i = 0; i < servers.length; ++i) {
            try {
                JSON.parse(servers[i])
            } catch (e) {
                throw new Error(`Element servers[${i}] not parsable as object: ${servers[i]}`)
            }
        }
        this.ring = new HashRing(servers, 'sha256')
    }

    getTracker(streamKey) {
        return JSON.parse(this.ring.get(streamKey))
    }

    getAllTrackers() {
        return Object.keys(this.ring.vnodes).map((record) => JSON.parse(record))
    }
}

async function fetchTrackers(contractAddress, jsonRpcProvider) {
    const provider = new JsonRpcProvider(jsonRpcProvider)
    // check that provider is connected and has some valid blockNumber
    await provider.getBlockNumber()

    const contract = new Contract(contractAddress, trackerRegistryConfig.abi, provider)
    // check that contract is connected
    await contract.addressPromise

    if (typeof contract.getNodes !== 'function') {
        throw Error(`getNodes function is not defined in smart contract (${contractAddress})`)
    }

    const result = await contract.getNodes()
    return result.map((tracker) => tracker.url)
}

function createTrackerRegistry(servers) {
    return new TrackerRegistry(servers)
}

async function getTrackerRegistryFromContract({ contractAddress, jsonRpcProvider }) {
    const trackers = await fetchTrackers(contractAddress, jsonRpcProvider)
    return createTrackerRegistry(trackers)
}

export {
    createTrackerRegistry,
    getTrackerRegistryFromContract,
}
