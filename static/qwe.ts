// 并发限制功能
type IteratorFn<T, K> = (item: T, array: T[]) => Promise<K>

/**
 * 并发限制功能
 * @param poolLimit 需要并行的数量
 * @param array 执行函数时每个item项为参数
 * @param iteratorFn 执行函数，返回为 Promise
 * @returns Promise
 */
function asyncPool<T, K>(poolLimit: number, array: Array<T>, iteratorFn: IteratorFn<T, K>) {
    let i = 0
    const ret: Array<Promise<K>> = []
    const executing: Array<Promise<any>> = []
    const enqueue = function (): Promise<any> {
        if (i === array.length) {
            return Promise.resolve()
        }
        const item = array[i++]
        const p = Promise.resolve().then(() => iteratorFn(item, array))
        ret.push(p)
        const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1))
        executing.push(e)

        let r = Promise.resolve()

        if (executing.length >= poolLimit) {
            r = Promise.race(executing)
        }
        return r.then(() => enqueue())
    }
    return enqueue().then(() => Promise.all(ret))
}

asyncPool<string, number>(1, ['arg1', 'arg2', 'arg3'], (item, array) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100)
        }, 3000)
    })
})