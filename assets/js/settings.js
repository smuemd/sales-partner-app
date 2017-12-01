/* APIs and Resource Paths */

// const apiHost = undefined // https://fury.network/api'
const rpcHost = 'https://fury.network/rpc'
const abiLocation =
  'https://unpkg.com/stromdao-businessobject@latest/smart_contracts/'

/* hard coded ethereum addresses for testing TODO: get rid of this later */
const ethAddresses = {
  mp: '0x83F8B15eb816284ddcF2ff005Db7a19196d86ae1', // Meter point address
  smpc: '0x2F516D1e3dcB330BB44c00cb919ab5081075C77E', // Account address: single meter point clearing
  sk: '0x19BF166624F485f191d82900a5B7bc22Be569895' // Ledger address (stromkonto)
}

/* Define routes */

const routesDescription = [
  { name: 'Home', route: '/' },
  { name: 'Login', route: '/login' },
  { name: 'Register', route: '/register' },
  { name: 'Account', route: '/account/:address' }
]

export const settings = {
  rpcHost: rpcHost,
  abiLocation: abiLocation,
  ethAddresses: ethAddresses,
  routePrefix: '#!',
  defaultRoute: '/',
  routesDesc: routesDescription
}
