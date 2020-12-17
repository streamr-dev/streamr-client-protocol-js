import { Todo } from '../sharedTypes';

export function ensureParsed(stringOrObject: Todo) {
    return (typeof stringOrObject === 'string' ? JSON.parse(stringOrObject) : stringOrObject)
}
