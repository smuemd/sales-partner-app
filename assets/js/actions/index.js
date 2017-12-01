'use strict'
const djb = require('js-hash/djb2')

let update

const createActions = function (updte) {
  update = updte
  return {
    onNavigateTo: onNavigateTo
  }
}

function onNavigateTo (page, params) {
  console.info('new route triggerd: ', page, ' ', params)
  update(function (model) {
    model.page = page
    model.query = window.location.href.split('?')[1] ? '?' + window.location.href.split('?')[1] : ''
    Object.assign(model.params, params)
    return model
  })
}

/**
 *
 * @param {string} string - to namespace, e. g. ledger account name
 * @param {string}tenantId
 * @param {boolean} appendYear
 * @return {string} - returns namespaces string, e. g. 'demo::entitlement::2016'
 */
function namespace (string, tenantId, appendYear) {
  // let app = app.appId ? app.appId + '::' : ''
  let tenant = tenantId ? tenantId + '::' : ''
  let year = appendYear ? '::' + (new Date()).getFullYear() : ''

  return tenant + string + year
}

/**
 *
 * @param {number} year
 * @return {number} - returns days of the given year
 */
function getDaysInYear (year) {
  return isLeapYear(year) ? 366 : 365;
}

/**
 *
 * @param {number} year
 * @return {boolean}
 */
function isLeapYear (year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

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

function serialPromise (funcs) {
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

/**
 *
 * @param {string} strg
 * @return {number}
 */
function hash (strg) {
  return Math.abs(djb(strg))
}

export { createActions as default, onNavigateTo, namespace, serialPromise, hash }

