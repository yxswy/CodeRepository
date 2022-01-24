// 防抖1.0
type Fn = () => void

/**
 * 防抖
 * @param fn 待执行函数 
 * @param wait 等待时间
 * @returns 执行函数
 */
function debounce(fn: Fn, wait: number) {
    let timeout: number | null = null
    return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}

const fn = debounce(() => {
    console.log(1)
}, 3000)

fn()
fn()
fn()