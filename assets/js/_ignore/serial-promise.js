/**
 * function serialPromise
 *
 * executes Promises sequentially.
 *
 * @param {function} funcs - An array of functions (funcs) that each return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 *
 * via https://stackoverflow.com/questions/24586110
 */
// const serialPromise = funcs =>
//     funcs.reduce((promise, func) =>
//         promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

export function serialPromise (funcs) {
  return funcs.reduce((promise, func) => {
    return promise
      .then(result => {
        return func()
          .then(
            Array.prototype.concat.bind(result)
          )
      })
  }, Promise.resolve([]))
}
