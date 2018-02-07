'use strict'

/**
 * Settings Object:
 * Provides initial hard coded app setting
 */

/** APIs and Resource Paths */
const apiHost = 'https://fury.network/api' /* 1 */
const rpcHost = 'https://fury.network/rpc' /* 1 */
const abilocation =
  'https://cdn.rawgit.com/energychain/StromDAO-BusinessObject/6dc9e073/smart_contracts/' /* 2 */

/** Fury Network Business Object configuration */
function createBusinessObjectConfig (extId) {
  let externalId = extId || '19810930'
  console.info(externalId)
  return {
    external_id: externalId,
    testMode: true,
    rpc: rpcHost,
    abilocation: abilocation
  }
}

const businessObject = document.StromDAOBO

/** Fury Business Object initialisation funtion */
// function createFuryNode (businessObj, businessObjConfig) {
//   return new businessObj.Node(businessObjConfig)
// }

/** Routes description */
const routesDescription = [
  { name: 'Home', route: '/' },
  { name: 'Login', route: '/login' },
  { name: 'Account', route: '/account/:address' }
]

/* hard coded ethereum addresses for testing TODO: get rid of this later */
const ethAddresses = {
  mp: '0x83F8B15eb816284ddcF2ff005Db7a19196d86ae1', // Meter point address
  smpc: '0x2F516D1e3dcB330BB44c00cb919ab5081075C77E', // Account address: single meter point clearing
  sk: '0x5b0c9c6c9fa239455293147ABcD525075B686643' // Ledger address (stromkonto)
}

/** settings export */
export default {
  apiHost: apiHost,
  businessObject: businessObject,
  createBusinessObjectConfig: createBusinessObjectConfig,
  ethAddresses: ethAddresses,
  // routePrefix: '#',
  defaultRoute: '/',
  routesDesc: routesDescription
}
