const djb = require('js-hash/djb2')

/**
 *
 * @param {string} strg
 * @return {number}
 */
export function hash (str) {
  return Math.abs(djb(str))
}
