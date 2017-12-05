/**
 *
 * @param {string} string - to namespace, e. g. ledger account name
 * @param {string}tenantId
 * @param {boolean} appendYear
 * @return {string} - returns namespaces string, e. g. 'demo::entitlement::2016'
 */
export function namespace (string, tenantId, appendYear) {
  // let app = app.appId ? app.appId + '::' : ''
  let tenant = tenantId ? tenantId + '::' : ''
  let year = appendYear ? '::' + (new Date()).getFullYear() : ''

  return tenant + string + year
}
