export type Todo = any

// TODO move to some better location, are some of the fields optional?
export interface StreamMetadata {
    partitions: number,
    requireSignedData: boolean,
    requireEncryptedData: boolean
}