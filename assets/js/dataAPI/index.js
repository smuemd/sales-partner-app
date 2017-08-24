'use strict'

// import m from 'mithril' // use m.request() for rest calls

export default createDataAPI

/**
 * Create Data API
 *
 * 1. Instantiate Business Object (loaded globally in header) from document node
 * 2. Return API Methods
 *
 * @param settings
 * @returns {{boFetchAccountSoll: boFetchAccountSoll}}
 */

function createDataAPI (settings) {
  /* Initialize business object node */
  document.node = new document.StromDAOBO.Node(settings.businessObjectConfig) /* 1 */

  return {
    boFetchAccountSoll: boFetchAccountSoll /* 2 */
  }
}

/**
 * Fetch Ledger
 *
 * Private method
 * 1. use business object to retrive and return Fury ledger contract from ethereum address
 *
 * @param address
 * @returns {*}
 */
function boFetchLedger (address) {
  return document.node.stromkonto(address) /* 1 */
}

/**
 * Fetch Account Soll
 *
 * Public method
 * 1. Load a leger contract by calling fetchLeger() with a ledger address as argument
 * 2. retrive and return account debit value (soll) from an account on the leger
 *    by calling balancesSoll() method of the ledger contract with an ledger account address
 *
 * @param ledgerAddress
 * @param accountAddress
 * @returns {Promise.<TResult>|*|{get}|Promise.<*>|{anyOf}}
 */
function boFetchAccountSoll (ledgerAddress, accountAddress) {
  return boFetchLedger(ledgerAddress) // '0x19BF166624F485f191d82900a5B7bc22Be569895' /* 1 */
    .then(function (ledger) {
      return ledger.balancesSoll(accountAddress) /* 2 */
    })
}

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
// function auth (extId, secret) {
//   if (!extId || !secret) {
//     console.error('submit username and password')
//     return
//   }
//   return m.request({
//     type: 'POST',
//     url: settings.apiHost + '/auth/' + extId + '/' + secret
//   })
// }
//
// function fetchPublicKey (extId, token) {
//   return m.request({
//     type: 'GET',
//     url: settings.apiHost + '/info/' + extId + '?token=' + token
//   })
// }
