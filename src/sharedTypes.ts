export type Todo = any

// TODO move to some better location, are some of the fields optional?
export interface StreamMetadata {
    partitions: number,
    requireSignedData: boolean,
    requireEncryptedData: boolean
}

export const PLACEHOLDER_REQUEST_ID_PROTOCOL_V1 = 'PLACEHOLDER_REQUEST_ID_PROTOCOL_V1'

export const PLACEHOLDER_ERROR_CODE_PROTOCOL_V1 = 'PLACEHOLDER_ERROR_CODE_PROTOCOL_V1'
