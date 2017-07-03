'use strict'
/* global m */
//  added Mithril globally via script tag for now
// import m from 'mithril'

/**
 * StromDAO-businessObject Example
 */

// Account model
const Account = {
  ledger: '0xfcBfE1e0D5B62b4E281609B150423b0F15082319',
  id: '0x0022aFE423D59a9f4AC99927a5d6D7E7c4BA017c',
  soll: 0,
  haben: 0,
  saldo: () => {
    return Account.haben - Account.soll
  },

  getLedger: () => document.node.stromkonto(Account.ledger),

  getHaben: () => Account.getLedger().then(ledger => {
    // TODO Initialize SDAO BO properly.
    return ledger.balancesHaben(Account.id).then(haben => {
      Account.haben = haben
      return Account.haben
    })
  }),

  getSoll: () => Account.getLedger().then(ledger => {
    return ledger.balancesSoll(Account.id).then(soll => {
      Account.soll = soll
      return Account.soll
    })
  }),

  getSaldo: () => Promise.all([
    Account.getHaben(),
    Account.getSoll()
  ]).then(values => {
    return Account.saldo()
  })
}

// Applying Model methods
Account.getSaldo().then(res => {
  let obj = {
    account: Account.id,
    soll: Account.soll,
    haben: Account.haben,
    saldo: Account.saldo
  }
  console.log(obj)

  /**
   * Mithril example
   */
  m.render(document.querySelector('span.mithril-test'), 'hello world from mithril (' + Account.saldo() + ')')
})
