/**
 *
 * @param {number} year
 * @return {number} - returns days of the given year
 */
export function getDaysInYear (year) {
  return isLeapYear(year) ? 366 : 365
}

/**
 *
 * @param {number} year
 * @return {boolean}
 */
function isLeapYear (year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}
