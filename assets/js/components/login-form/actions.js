import * as furyRPC from '../../furyRPC'
import * as furyAuth from '../../furyAuthMgr'

let update

const user = {
  extid: '',
  address: '',
  account: {
    username: '',
    password: '',
    decrypt: undefined,
    encrypt: undefined,
    wallet: undefined,
    rsaPrivate: '',
    rsaPublic: ''
  },
  node: undefined
}

let furyUser = user

export const createActions = (updte) => {
  update = updte
  return {
    // authenticateUser: authUser,
    authenticateUser: authenticateUser
  }
}

function authenticateUser (username, password) {
  let start = Date.now()
  user.extid = username
  update((model) => {
    model.vm.authInProgress = true
    return model
  })
  furyAuth.fetchUserAccount(username, password)
    .then(userAccount => {
      Object.assign(user.account, userAccount)
      return furyAuth.fetchUserNode(userAccount)
    })
    .then(userNode => {
      if (!userNode) {
        update(model => {
          // Object.assign(model.user.account, user.account)
          model.page = 'Register'
          model.params = { msg: 'register an account!' }
          return model
        })
        return
      }
      user.address = userNode().wallet.address
      user.node = userNode
      update(model => {
        model.vm.authInProgress = false
        model.page = 'Account'
        model.params = { address: user.address }
        Object.assign(model.user, user)
        console.log('model.user:  ', model.user)
        return model
      })
    })
    .then(() => {
      let duration = (Date.now() - start) / 1000
      console.log('login total duration: ', duration, ' sec')
      console.info('isauthenticated? ', isAuthendicated())
      // fetchRSAKeys(authNode(), accountObj)
    })
    .catch(err => console.error(err))
}

// function authUser (username, secret) {
//   let authNode
//   let accountObj
//   accountObj = furyRPC.createAccount(username, secret)
//   update((model) => {
//     model.vm.authInProgress = true
//     return model
//   })
//   let start = Date.now()
//   accountObj.wallet()
//     .then(wallet => {
//       let mid = Date.now()
//       let midduration = (mid - start) / 1000
//       console.log('login mid-duration: ', midduration, ' sec')
//       console.log('wallet:  ', wallet)
//       authNode = () => furyRPC.createNode({
//         extid: 'authNode',
//         privateKey: wallet.privateKey
//       })
//       accountObj.wallet = wallet
//       furyUser.extid = username
//       Object.assign(furyUser.account, accountObj)
//       update(model => {
//         Object.assign(model.user, furyUser)
//         model.page = 'Account'
//         Object.assign(model.params, { address: furyUser.account.wallet.address })
//         return model
//       })
//       return fetchUserPrivateKey(accountObj, authNode())
//     })
//     .then(privateKey => {
//       furyUser.node = () => furyRPC.createNode({ extid: username, privateKey })
//       furyUser.address = furyUser.node().wallet.address
//       update(model => {
//         Object.assign(model.user, furyUser)
//         model.vm.authInProgress = false
//         console.log('model.user:  ', model.user)
//         console.log('user.node.wallet', model.user.node().wallet)
//         return model
//       })
//       let end = Date.now()
//       let duration = (end - start) / 1000
//       console.log('login total duration: ', duration, ' sec')
//     })
//     .then(() => {
//       console.info('isauthenticated? ', isAuthendicated())
//       fetchRSAKeys(authNode(), accountObj)
//     })
//     .catch(err => console.error(err))
// }

/**
 *
 * @param {object} n - fury node
 * @param {function} n.furyuser
 * @param {object} accountObj
 * @return {*|Promise<T | void>}
 */
function fetchRSAKeys (authNode, accountObj) {
  let start = Date.now()
  let end
  return authNode.furyuser()
    .then(furyuser => {
      console.log('authNode.furyuser   ', furyuser)
      return furyuser.getRSAKeys(accountObj)
    })
    .then(() => {
      update(model => {
        model.user.account.rsaPrivate = accountObj.RSAPrivateKey
        model.user.account.rsaPublic = accountObj.RSAPublicKey
        return model
      })
      end = Date.now()
      console.info('end fetchRSAKeys ', (end - start) / 1000, ' sec')
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {object} accountObj
 * @param {object) accountObj.wallet
 * @param {string} accountObj.wallet.address
 * @param {function} accountObj.decrypt
 * @param {object} [n = furyRPC.createNode()]
 * @return {Promise<string>}
 */
function fetchUserPrivateKey (accountObj, n) {
  n = n || furyRPC.createNode()
  console.log(accountObj.wallet.address)
  return furyRPC.getRelation(accountObj.wallet.address, 222, n)
    .then(stringStore => {
      if (stringStore === '0x0000000000000000000000000000000000000000') { return }
      return n.stringstorage(stringStore)
        .then(fetch => fetch.str())
        .then(string => accountObj.decrypt(string))
    })
    .catch(err => console.error(err))
}

function isAuthendicated () {
  let check
  let extid
  let userAddress
  let accountAddress
  update(model => {
    extid = model.user.extid
    userAddress = model.user.address
    accountAddress = model.user.account.wallet.address
    return model
  })
  check = (
    furyRPC.createNode({ extid }).wallet.address === userAddress &&
    furyRPC.createNode({ extid: 'authNode' }).wallet.address === accountAddress
  )
  return check
}
