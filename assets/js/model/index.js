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

const localStore = window.localStorage
let extId = localStore.getItem('user:extId') || undefined
let token = localStore.getItem('user:token') || undefined

export default function createModel (settings) {
  return {
    page: undefined,
    routesDesc: settings.routesDesc, /* 1 */
    routeName: settings.routesDesc[0].name,
    routeRedirect: false,
    params: {},
    user: {
      extId: extId,
      token: token,
      authLevel: undefined,
      localNode: {
        __persistentAddress: undefined,
        __persistentPk: undefined,
        address: localStore.getItem('user[' + extId + ']:localNode:address') || undefined,
        pk: localStore.getItem('user[' + extId + ']:localNode:pk') || undefined
      },
      remoteNode: {
        address: localStore.getItem('user[' + extId + ']:remoteNode:address') || undefined,
      }
    },
    partnerAccount: {
      status: undefined,
      address: localStore.getItem('user[' + extId + ']:remoteNode:address') || undefined,
      haben: undefined,
      soll: undefined,
      saldo: undefined,
      transactions: undefined
    }
  }
}
