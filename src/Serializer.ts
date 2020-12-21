export abstract class Serializer<T> {

    abstract toArray(request: T, streamMessageVersion?: number): any[]

    abstract fromArray(arr: any): T

}