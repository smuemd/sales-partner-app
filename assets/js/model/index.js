'use strict'

/**
 * Create Model
 *
 * 1. populate routeDesc with settings data
 * 2. set inital model default values
 *
 * @param settings
 * @returns {{routesDesc: *, page: undefined, routeName, params: {}, data: {}, user: {extId: undefined, secret: undefined, token: undefined}}}
 */

export default function createModel (settings) {
  return {
    routesDesc: settings.routesDesc, /* 1 */
    page: undefined, // redundant: same as routeName
    routeName: settings.routesDesc[0].name,
    params: {},
    data: {},
    user: {
      extId: undefined,
      secret: undefined,
      token: undefined
    }
  }
}
