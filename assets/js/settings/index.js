'use strict'

/**
 * Settings Object
 *
 * provides initial hard coded app settings
 */

/**
 * APIs and Resource Paths
 *
 * 1. URIs to the host server of the (a) restful API and (b) JSON RPC APIs
 * 2. Location of Smart Contracts
 */

const apiHost = 'https://demo.stromdao.de/api' /* 1 */
const rpcHost = 'https://demo.stromdao.de/rpc' /* 1 */
const abilocation = 'https://cdn.rawgit.com/energychain/StromDAO-BusinessObject/6dc9e073/smart_contracts/' /* 2 */

/**
 * Business Object
 */

const businessObjectConfig = {
  external_id: '19810930',
  testMode: true,
  rpc: rpcHost,
  abilocation: abilocation
}

/**
 * Routes description
 */

const routesDescription = [
  { name: 'Home', route: '/' },
  { name: 'Login', route: '/login' },
  { name: 'Item', route: '/item/:id' }
]

/** settings export */
export default {
  apiHost: apiHost,
  rpcHost: rpcHost,
  businessObjectConfig: businessObjectConfig,
  routePrefix: '#',
  defaultRoute: '/',
  routesDesc: routesDescription
}
