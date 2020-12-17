import { Todo } from './sharedTypes'

export abstract class Serializer<T> {

    abstract toArray(request: Todo, streamMessageVersion?: number): Todo[]

    abstract fromArray(arr: Todo): T

}