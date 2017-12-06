import * as furyRPC from '../furyRPC'

export function fetchUserAccount (username, secret) {
  console.info('fetching user account from cryptoland')
  return initializeAccount(furyRPC.createAccount(username, secret))
}

function initializeAccount (accountObj) {
  let start = Date.now()
  return accountObj.wallet()
    .then(wallet => {
      accountObj.wallet = wallet
      let duration = (Date.now() - start) / 1000
      console.info('Success: user account initialization in only ', duration, 'sec')
      return accountObj
    })
}

export function fetchUserNode (accountObj) {
  let start = Date.now()
  return furyRPC.readRelationString(
    accountObj.wallet.address,
    222,
    furyRPC.createNode({
      extid: accountObj.username + '::account',
      privateKey: accountObj.wallet.privateKey
    })
  ).then(encodedStrg => {
    if (!encodedStrg) {
      console.error('no private key found. Register to set up an account')
      return
    }
    return accountObj.decrypt(encodedStrg).then(privKey => {
      console.log('privKey', privKey)
      let duration = (Date.now() - start) / 1000
      console.info('Success: user node initialization in only ', duration, 'sec')
      // TODO check is privKey is wallet
      return function () {
        return furyRPC.createNode({
          extid: accountObj.username,
          privateKey: privKey
        })
      }
    }, err => console.error(err, 'user node not initialized'))
  })
}
