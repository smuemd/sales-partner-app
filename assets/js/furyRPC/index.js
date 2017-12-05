import { settings } from '../settings'
const fury = document.StromDAOBO

export {
  createAccount,
  createNode,
  getRelation,
  setRelation,
  readRelationString,
  writeRelationString,
  fetchMeterpointReading,
  storeMeterpointReading,
  createLedger,
  addSenderToLedger,
  fetchAccountDebit,
  fetchAccountCredit,
  addTx
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @return {Object} Fury account object
 */
function createAccount (username, password) {
  console.info(
    '[furyRPC]: createAccount() called with -u ',
    username,
    ' and -p ',
    password)

  return new fury.Account(username, password)
}

/**
 *
 * @param {object} param
 * @param {string} [param.extid='default']
 * @param {string} [param.privateKey=undefined]
 * @return {Object} an initialized Fury node
 */
function createNode ({ extid = 'default', privateKey } = {}) {
  console.info('[furyRPC]: createNode() called with -extid', extid)
  return new fury.Node({
    external_id: extid,
    privateKey: privateKey,
    testMode: true,
    rpc: settings.rpcHost,
    abilocation: settings.abiLocation
  })
}

/**
 *
 * @param {string} address - Ethereum address
 * @param {int} key - role lookup register number (8-bit integer)
 * @param {object} [n] - business object node
 * @return {Promise.<string>}
 */
function getRelation (address, key, n) {
  if (!n) { n = createNode('default') }
  return n.roleLookup()
    .then(rl => {
      return rl.relations(address, key)
    })
    .then(res => {
      console.info('roleLookup relation ', key, ' of ', address, ' points to ', res)
      return res
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {object} n - business object node
 * @param {int} key - role lookup register number (8-bit integer)
 * @param {string} toAddress - ethereum address to be referenced in role lookup
 * @param {boolean} [overwriteExisting] - will overwrite existing role lookup references if true
 * @return {Promise.<string>, <undefined>}
 */
function setRelation (n, key, toAddress, overwriteExisting) {
  return n.roleLookup()
    .then(rl => {
      return rl.relations(n.wallet.address, key)
    })
    .then(lookedupAddress => {
      if (lookedupAddress === '0x0000000000000000000000000000000000000000' || overwriteExisting === true) {
        console.info('setting role lookup relation', key, ' of ', n.wallet.address, ' to ', toAddress)
        return n.roleLookup()
          .then(rl => {
            return rl.setRelation(key, toAddress)
          })
      } else {
        console.warn('Role lookup relation ', key, 'already exists: ', lookedupAddress)
        console.warn('will not overwrite existing')
        return undefined
      }
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {string} address
 * @param {number} key
 * @param {object} [n] - business object node
 * @return {Promise.<string>}
 */
function readRelationString (address, key, n) {
  n = n || createNode()
  return getRelation(address, key, n)
    .then(strgStoreAddress => {
      return n.stringstorage(strgStoreAddress)
    })
    .then(strgStore => {
      return strgStore.str()
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param n {object} n - business object node
 * @param {number} key - role look-up register number of string-storage contract address
 * @param {string} string - string to store and reference
 * @return {Promise.<TResult>|Promise.<*>|*|{get}}
 */
function writeRelationString (n, key, string) {
  return n.stringstoragefactory()
    .then(ssf => {
      console.log('stringStore relation at role', key, 'string: ', string)
      return ssf.buildAndAssign(key, string)
    })
}

/**
 *
 * @param {string} address - ethereum address of meterpoint
 * @param {object} [n] - business object node
 * @return {Promise.<number>} - current reading
 */
function fetchMeterpointReading (address, n) {
  if (!n) n = createNode()
  return n.mpr()
    .then(mpr => {
      return mpr.readings(address)
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {object} [n] - business object node
 * @param {number} uint256
 * @return {Promise.<string>} - ethereum Tx number of store event
 */
function storeMeterpointReading (n, uint256) {
  return n.mpr().then(mpr => {
    return mpr.storeReading(uint256)
  })
}

/**
 *
 * @param {object} [n] - business object node
 * @param {boolean} [overwriteExisting=undefined]
 * @return {Promise.<string>} - ledger
 */
function createLedger (n, overwriteExisting) {
  console.info('creating ledger for ', n.wallet.address)
  return n.stromkontoproxyfactory()
    .then(skpf => {
      return skpf.build()
    })
    .then(ledgerAddress => {
      setRelation(n, 42, ledgerAddress, overwriteExisting)
        .then(tx => console.info('role lookup update done. Tx number:.  ', tx))
      return ledgerAddress
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {object} n - business object node
 * @param {string} senderAddress - ethereum address
 * @param {string} ledgerAddress - ethereum address
 * @return {Promise.<string>} - Transaction number
 */
function addSenderToLedger (n, senderAddress, ledgerAddress) {
  return n.stromkontoproxy(ledgerAddress)
    .then(ledger => {
      return ledger.modifySender(senderAddress, true)
    })
    .then((tx) => {
      console.info('added address ', senderAddress, ' as sender to ledger ', ledgerAddress, 'Tx:  ', tx)
      return tx
    })
    .catch(err => console.error(err))
}

/**
 *
 * @param {string} ledgerAddress - ethereum address
 * @param {string} accountAddress - ethereum address of a ledger account
 * @param {object} [n] - business object node
 * @return {Promise.<number>} - account credit value
 */
function fetchAccountDebit (ledgerAddress, accountAddress, n) {
  if (!n) n = node()
  return n.stromkonto(ledgerAddress)
    .then(ledger => {
      return ledger.balancesHaben(accountAddress)
    })
}

/**
 *
 * @param ledgerAddress
 * @param {string} ledgerAddress - ethereum address
 * @param {string} accountAddress - ethereum address of a ledger account
 * @param {object} [n] - business object node
 * @return {Promise.<number>} - account debit value
 */
function fetchAccountCredit (ledgerAddress, accountAddress, n) {
  if (!n) n = node()
  return n.stromkonto(ledgerAddress)
    .then(ledger => {
      return ledger.balancesSoll(accountAddress)
    })
}

/**
 *
 * @param {object} n - business object node
 * @param {string} ledgerAddress - ethereum address
 * @param {string} fromAccount - ethereum address
 * @param {string} toAccount - ethereum address
 * @param {number} txValue
 * @param {number} [txBase=0] - base amount to calculate Tx value
 * @return {Promise.<string>} - Tx number
 */
function addTx (n, ledgerAddress, fromAccount, toAccount, txValue, txBase) {
  return n.stromkonto(ledgerAddress).then(sko => {
    return sko.addTx(fromAccount, toAccount, txValue, txBase)
  })
}
