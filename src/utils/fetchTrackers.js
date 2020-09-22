import { Contract, providers } from 'ethers'

const { JsonRpcProvider } = providers

export default async function fetchTrackers(address, trackerRegistryConfig, jsonRpcProvider) {
    const provider = new JsonRpcProvider(jsonRpcProvider)
    // check that provider is connected and has some valid blockNumber
    await provider.getBlockNumber()

    const contract = new Contract(address, trackerRegistryConfig.abi, provider)
    // check that contract is connected
    await contract.addressPromise

    const trackers = []

    if (typeof contract.getNodes !== 'function') {
        throw Error('getNodes is not defined in contract')
    }

    const result = await contract.getNodes()
    result.forEach((node) => {
        trackers.push(node.url)
    })

    return trackers
}
