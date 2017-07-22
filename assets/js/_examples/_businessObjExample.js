/**
 *
 * StromDAO-businessObject Example
 *
 */

// Create Instance with external ID 1234
let node = new document.StromDAOBO.Node({
  external_id: '19810930',
  testMode: true,
  rpc: 'https://demo.stromdao.de/rpc',
  abilocation:
    'https://cdn.rawgit.com/energychain/StromDAO-BusinessObject/6dc9e073/smart_contracts/'
})

document.node = node

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

  getHaben: () =>
    Account.getLedger().then(ledger => {
      return ledger.balancesHaben(Account.id).then(haben => {
        Account.haben = haben
        return Account.haben
      })
    }),

  getSoll: () =>
    Account.getLedger().then(ledger => {
      return ledger.balancesSoll(Account.id).then(soll => {
        Account.soll = soll
        return Account.soll
      })
    }),

  getSaldo: () =>
    Promise.all([Account.getHaben(), Account.getSoll()]).then(() => {
      return Account.saldo()
    })
}

// Applying Model methods
/* TODO: this is not working right now. @Thorsten. */
Account.getSaldo().then(() => {
  console.log(node.rpcprovider)
  let obj = {
    account: Account.id,
    soll: Account.soll,
    haben: Account.haben,
    saldo: Account.saldo
  }
  console.log(obj)
})
