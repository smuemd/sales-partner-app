'use strict'
import isServer from 'detect-node'
import m from 'mithril' // use m.request() for rest calls
export default createDataAPI

let settings

// TODO: (1) add Window support => https://www.npmjs.com/package/window

/** Creates and exports app data API obj w/ API methods */
function createDataAPI (sttngs) {
  settings = sttngs
  let extId = window.localStorage.getItem('user:extId')
  let token = window.localStorage.getItem('user:token')
  // m.request.withCredentials
  return {
    authenticateUser: authenticateUser,
    fetchRemoteNodeAddress: fetchRemoteNodeInfo,
    fetchAccountHaben: fetchAccountHaben,
    fetchAccountSoll: fetchAccountSoll,
    fetchAccountTxHistory: fetchAccountTxHistory,

    // only if process environment is a browser.
    createFuryNode: createLocalNode,
    furyNode: (extId && token) ? createLocalNode(extId) : undefined
  }
}

function createLocalNode (externalId) {
  if (!isServer) {
    return new settings.businessObject.Node(settings.createBusinessObjectConfig(externalId))
  } else {
    return undefined
  }
}

/** Mount Fury network Ledger contract (Stromkonoto - sk)
 *
 * @param furyNode
 * @param ledgerAddress
 * @returns {*} Object with ledger methods
 */
function mountLedger (furyNode, ledgerAddress) {
  return furyNode.stromkonto(ledgerAddress) /* 1 */
}

/**
 * Fetch aggregated debit value (Soll) of a single account on a ledger contract
 *
 * @param furyNode
 * @param ledgerAddress
 * @param accountAddress
 * @returns accountDebit (Soll)
 */
function fetchAccountSoll (furyNode, ledgerAddress, accountAddress) {
  return mountLedger(furyNode, ledgerAddress) // '0x19BF166624F485f191d82900a5B7bc22Be569895' /* 1 */
    .then(function (ledger) {
      return ledger.balancesSoll(accountAddress) /* 2 */
    })
}

/**
 * Fetch aggregated credit value (Haben) of a single account on a ledger contract
 *
 * @param furyNode
 * @param ledgerAddress
 * @param accountAddress
 * @returns accountCredit (Haben)
 */
function fetchAccountHaben (furyNode, ledgerAddress, accountAddress) {
  return mountLedger(furyNode, ledgerAddress)
    .then(ledger => {
      return ledger.balancesHaben(accountAddress)
    })
}

/**
 * Fetch full Transaction History of a single account on a ledger contract
 *
 * @param furyNode
 * @param ledgerAddress
 * @param accountAddress
 * @param blockCount - limits the number of blocks to be queried
 * @returns {[*]} - returns an array of transactions
 */
function fetchAccountTxHistory (furyNode, ledgerAddress, accountAddress, blockCount) {
  blockCount = blockCount || 1000 // specify how many blocks will be queried
  return mountLedger(furyNode, ledgerAddress)
    .then(ledger => {
      return ledger.history(accountAddress, blockCount)
    })
}

/** Authentictes the user at the API host server */
function authenticateUser (extId, secret) {
  console.info('Authenticating User with extId "' + extId + '" and secret "' + secret + '"')
  if (!extId || !secret) {
    throw Error('submit username and password')
  }
  return m.request({
    type: 'POST',
    url: settings.apiHost + '/auth/:extId/:secret',
    data: {
      extId: extId,
      secret: secret
    }
  })
}

function fetchRemoteNodeInfo (extId, token) {
  return m.request({
    type: 'GET',
    url: settings.apiHost + '/info/' + extId + '?token=' + token
  })
}

// function fetchAccountPeer2PeerTxHistory (
//   furyNode,
//   ledgerAddress,
//   accountAddress,
//   peerAccountAddress,
//   blockCount
// ) {
//   blockCount = blockCount || 1000 // specify how many blocks will be queried
//   return mountLedger(furyNode, ledgerAddress)
//     .then(ledger => {
//       return ledger.historyPeer(accountAddress, peerAccountAddress, blockCount)
//     })
// }

/** Mounts a Meter Point Reading contract (mpr@genesis) */
// function mountMprContract (node) {
//   return node.mpr()
// }

/** Fetch the last meter reading from a meter point address */
// function fetchMeterReading (node, meterPointAddress) {
//   return mountMprContract(node)
//     .then(mpr => {
//       return mpr.readings(meterPointAddress)
//     })
// }

/**
 * Mount a Single Clearing contract (single meter point clearing - smpc)
 *
 * @param furyNode
 * @param smpcContractAddress
 * @returns {*} most recent single meter point settlement object
 */
// function mountSmpcContract (furyNode, smpcContractAddress) {
//   return furyNode.singleclearing(smpcContractAddress)
// }

/**
 * Fetch most recent settlement data of a Single Clearing contract
 *
 * @param furyNode
 * @param smpcContractAddress
 * @returns {Promise.<T>}, [ Settlement meter reading, settlement time, settlement energy cost, meter point address, ledger address ]
 */
// function fetchSmpcSettlement (furyNode, smpcContractAddress) {
//   return mountSmpcContract(furyNode, smpcContractAddress)
//     .then(settlement => {
//       let s = settlement
//       return Promise.all([
//         s.last_reading(),
//         s.last_time(),
//         s.energyCost(),
//         s.meterpoint(),
//         s.stromkonto()
//       ])
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

// function fetchAccountHaben (ledgerAddress, accountAddress, token) {
//   return m.request({
//     type: 'GET',
//     url: settings.apiHost + '/stromkonto/:ledger/balancesHaben/' + accountAddress + '?token=' + token,
//     data: {
//       ledger: ledgerAddress,
//       account: accountAddress
//     }
//   })
// }
//
// function fetchAccountSoll (ledgerAddress, accountAddress, token) {
//   return m.request({
//     type: 'GET',
//     url: settings.apiHost + '/stromkonto/:ledger/balancesSoll/' + accountAddress + '?token=' + token,
//     data: {
//       ledger: ledgerAddress,
//       account: accountAddress
//     }
//   })
// }
//
//
// function fetchPublicKey (extId, token) {
//   return m.request({
//     type: 'GET',
//     url: settings.apiHost + '/info/' + extId + '?token=' + token
//   })
// }
