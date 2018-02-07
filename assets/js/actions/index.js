'use strict'
import m from 'mithril'
import { getEuro } from '../helpers/helperFunctions'

export default createActions

let model
let dataApi

function createActions (mdl, api) {
  model = mdl
  dataApi = api

  return {
    onNavigateTo: onNavigateTo(model),
    log: logOnNavigate(model, dataApi),
    authenticateUser: authenticateUser(model, dataApi),
    logout: logoutUser(model, dataApi)
  }
}

/** Mutates model attributes depending on current route  */
function onNavigateTo (model) {
  /**
   * 1. sets model.routeName and model.page properties
   * 2. saves route parameters
   */
  return function (routeName, params) {
    console.info('routeName: ', routeName)
    console.info('route params: ', params)
    model.routeName = model.page = routeName
    model.params = params || {}

    // TODO: item = account / id = address / make address dynamic
    if (model.routeName === 'Home' && model.user.remoteNode.address) {
      m.route.set('/account/' + model.user.remoteNode.address)
      return
    }

    // checkAuth
    if (!checkAuth()) {
      redirectToLogin()
      return
    }
    if (model.routeName === 'Account' && params.address) {
      fetchAccountData(params.address) // model partnerAccount.address || model.user.remoteNode.address
    }
  }
}

function fetchAccountData (accountAddress) {
  let node = dataApi.furyNode
  let ledger = '0x5b0c9c6c9fa239455293147ABcD525075B686643' // TODO derive form settings
  let account = '0x19c541b0832543faed2c42ec8d6b96d9287dc33f'
    // accountAddress ||
    //window.localStorage.getItem(
    //  'user[' + model.user.extId + ']:remoteNode:address'
    //)
  console.info('fetchAccountData() was triggerd.')
  console.log(node, ledger, account)
  if (!node || !ledger || !account) {
    throw Error('Sales node or ledger or account is undefined')
  }
  Promise.all([
    dataApi.fetchAccountTxHistory(node, ledger, account, 60000),
    dataApi.fetchAccountHaben(node, ledger, account),
    dataApi.fetchAccountSoll(node, ledger, account)
  ])
    .then(a => {
      a.push(a[1] - a[2])
      Object.assign(model.partnerAccount, {
        address: account,
        haben: setValue(a[1]),
        soll: setValue(a[2]),
        saldo: setValue(a[3]),
        transactions: a[0].reverse(),
        status: { message: 'loaded', timestamp: Date.now() }
      })
      m.redraw()
    })
    .catch(function (err) {
      console.error(err)
    })
}

// helper functions for fetchAccountData
function setValue (value) {
  return {
    value: value,
    unit: 'raw value',
    toEuro: valueToEuro
  }
}

function valueToEuro () {
  return {
    value: getEuro(this.value),
    unit: 'Euro'
  }
}

/**
 * @param model
 * @return {Function}
 */
function logOnNavigate (model, dataApi) {
  return function (itemName, params) {
    console.info('model:  ', model)
  }
}

function checkAuth () {
  let extId = window.localStorage.getItem('user:extId')
  let token = window.localStorage.getItem('user:token')
  // let infoMsg = 'User  "' + extId + '" is authenticated'
  let warnMsg = 'User is not authenticated: Please log in.'
  if (!token || !extId) {
    console.warn(warnMsg)
    return false
  }
  if (token && extId) {
    // console.info(infoMsg)
    return true
  }
}

function redirectToLogin () {
  if (model.routeName === 'Login') {
    model.routeRedirect = model.routeRedirect || '/#!/'
    return
  }

  let reRoute =
    window.location.pathname + window.location.hash + window.location.search // grab just the route, not the domain
  model.routeRedirect = reRoute
  window.history.pushState({}, 'Login', '/#!/login?redirect=true') // redirect to Login page
  model.routeName = model.page = 'Login'
}

function authenticateUser (mdl, api) {
  model = mdl
  dataApi = api
  return function (username, password) {
    let extId = username
    let secret = password
    let localStore = window.localStorage
    let reRoute = model.routeRedirect
      ? model.routeRedirect.slice(3)
      : window.location.origin

    dataApi
      .authenticateUser(extId, secret)
      .then(function (obj) {
        console.info(
          'Success: remoteNode with extId "' + extId + '" authenticated'
        )
        // console.log('authdata', obj)
        localStore.setItem('user:extId', extId)
        localStore.setItem('user:token', obj.token)
        localStore.setItem(
          'user:authLevel',
          obj.auth === 'demo' ? 'readonly' : 'write'
        )
        model.user.extId = extId
        model.user.token = obj.token
        model.user.authLevel = obj.auth === 'demo' ? 'readonly' : 'write'

        dataApi.furyNode = dataApi.createFuryNode(extId)
        console.info('Success: localNode with extId "' + extId + '" created.')
        localStore.setItem(
          'localNode:__persistentAddress',
          dataApi.furyNode.nodeWallet.address
        )
        localStore.setItem(
          'localNode:__persistentPk',
          dataApi.furyNode.nodeWallet.privateKey
        )
        localStore.setItem(
          'user[' + extId + ']:localNode:address',
          dataApi.furyNode.wallet.address
        )
        localStore.setItem(
          'user[' + extId + ']:localNode:pk',
          dataApi.furyNode.wallet.privateKey
        )
        model.user.localNode.__persistentAddress =
          dataApi.furyNode.nodeWallet.address
        model.user.localNode.__persistentPk =
          dataApi.furyNode.nodeWallet.privateKey
        model.user.localNode.address = dataApi.furyNode.wallet.address
        model.user.localNode.pk = dataApi.furyNode.wallet.privateKey

        /* Fetch remote node address (verifies that API token is working) */
        dataApi
          .fetchRemoteNodeAddress(extId, obj.token)
          .then(address => {
            console.info(
              'Success! Remote node address fetched via REST API: ',
              address
            )
            localStore.setItem(
              'user[' + extId + ']:remoteNode:address',
              address
            )
            model.user.remoteNode.address = address
            model.partnerAccount.address = address
            model.routeRedirect = false
          })
          .then(() => {
            // reroute to original route & update routeRedirect state
            m.route.set(reRoute)
          })
          .catch(err => {
            let errMsg =
              'Failed to fetch address of remoteNode with extId "' + extId + '"'
            console.error(errMsg, err)
          })
      })
      .catch(function (err) {
        let errMsg = 'Authentication failed'
        console.error(errMsg, err)
      })
  }
}

function logoutUser (model, dataApi) {
  return function () {
    model.user.extId = undefined
    model.user.token = undefined
    model.user.authLevel = undefined
    model.user.localNode = {}
    model.user.remoteNode = {}
    model.partnerAccount = {}
    dataApi.furyNode = undefined
    window.localStorage.removeItem('user:extId')
    window.localStorage.removeItem('user:token')
    redirectToLogin()
  }
}
