'use strict'
var m = require('mithril')

/**
 * StromDAO-businessObject Example
 */

// Account model
class Account {
  constructor () {
    this.ledger = '0xfcBfE1e0D5B62b4E281609B150423b0F15082319'
    this.id = '0x0022aFE423D59a9f4AC99927a5d6D7E7c4BA017c'
    this.soll = 0
    this.haben = 0
  }

  saldo () {
    return this.haben - this.soll
  }

  getLedger () {
    return document.node.stromkonto(this.ledger)
  }

  getHaben () {
    var self = this
    return this.getLedger().then(ledger => {
      return ledger.balancesHaben(self.id).then(haben => {
        self.haben = haben
        return self.haben
      })
    })
  }

  getSoll () {
    var self = this
    return this.getLedger().then(ledger => {
      return ledger.balancesSoll(self.id).then(soll => {
        self.soll = soll
        return self.soll
      })
    })
  }

  getSaldo () {
    var self = this
    return Promise.all([this.getHaben(), this.getSoll()]).then(values => {
      return self.saldo()
    })
  }
}

let account = new Account()
account
  .getSaldo()
  .then(res =>
    m.render(
      document.querySelector('#index'),
      `hello world from mithril ${res}`
    )
  )
