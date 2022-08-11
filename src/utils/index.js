
console.log(this, window)
export function debounce (fn, waiting = 1000) {
  let timer
  console.log('debounce ---', this)
  return function () {
    console.log('setTimeout ---', this)
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, waiting)
  }
}