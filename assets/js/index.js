/* global node */
'use strict'
import m from 'mithril'

window.addEventListener('DOMContentLoaded', main)
function main () {
  const node = new document.StromDAOBO.Node({
    external_id: '19810930',
    testMode: true,
    rpc: 'https://demo.stromdao.de/rpc',
    abilocation:
      'https://cdn.rawgit.com/energychain/StromDAO-BusinessObject/6dc9e073/smart_contracts/'
  })
  document.node = node

  let settings = {
    // apiHost: 'https://node-hnapi.herokuapp.com',
    apiHost: 'https://demo.stromdao.de/api',
    routePrefix: '#',
    defaultRoute: '/',
    routesDesc: [
      { name: 'Home', route: '/' },
      { name: 'Login', route: '/login' },
      { name: 'Item', route: '/item/:id' }
    ]
  }

  let model = createModel(settings)
  let dataApi = createDataApi(settings)
  let actions = createActions(model, dataApi)
  let routeResolver = createRouteResolver(model, actions)

  m.route.prefix(settings.routePrefix)
  m.route(document.body, settings.defaultRoute, routeResolver)
}

const view = (function () {
  function view (model, actions) {
    return m('.app', vwNav(model, actions), vwPage(model, actions))
  }

  function vwNav (model, actions) {
    let defaults = [
      { name: 'Home', route: '/' },
      { name: 'Login', route: '/login' },
      {
        name: 'UST',
        route: '/item/0x4caB5660420BECAF280553b8c5634668379b81E0'
      },
      {
        name: 'EEG',
        route: '/item/0x9B6084a9a35Fc638A67Fd43d6c73B9325263D2f5'
      },
      {
        name: 'Stromsteuer',
        route: '/item/0xE4Dd81107246BC8366a28b2F346c1F3C0146526d'
      },
      {
        name: 'Konzessionsabgabe',
        route: '/item/0xC3d7291E403703Ae8BbF1d924C854c60B617D611'
      },
      {
        name: 'KWK Umlage',
        route: '/item/0xAc67A65B42186284e3c1748927Ce2590ad51390b'
      },
      {
        name: '§19 Umlage',
        route: '/item/0x5be5c47D592f1eaE734c2f297a396bb5DE2610d5'
      },
      {
        name: 'Logistik',
        route: '/item/0x6011229E95916A766DC525b68866CB082be4b252'
      },
      {
        name: 'ledger',
        route: '/item/0x19BF166624F485f191d82900a5B7bc22Be569895'
      },
      {
        name: 'smpc',
        route: '/item/0x2F516D1e3dcB330BB44c00cb919ab5081075C77E'
      }
    ]

    return m(
      'ul.nav',
      // model.routesDesc.map(function (itm) {
      //   let href = defaults[itm.route] || itm.route
      //   return m(
      //     'li' + isActive(itm.name),
      //     m('a', { href: href, oncreate: m.route.link }, itm.name)
      //   )
      // })
      defaults.map(function (item) {
        let href = item.route
        return [
          m('li', m('a', { href: href, oncreate: m.route.link }, item.name))
        ]
      })
    )

    function isActive (page) {
      return model.page === page ? '.active' : ''
    }
  }

  function vwPage (model, actions) {
    return [
      model.page === 'Login'
        ? vwLogin(model, actions)
        : model.page === 'Item'
          ? vwItem(model, actions)
          : vwHome(model, actions),
      vwData(model)
    ]
  }

  function vwData (model) {
    let style =
      'overflow-wrap: break-word; white-space: pre-wrap; line-height:1.5;'
    return [
      m(
        'pre',
        { style: style },
        model.user
          ? 'User credentials: ' + JSON.stringify(model.user)
          : 'loading...'
      ),
      m(
        'pre',
        { style: style },
        model.data ? 'App data: ' + JSON.stringify(model.data) : 'loading...'
      )
    ]
  }

  function vwHome (model, actions) {
    return m('div', 'Home Page', ' | ', vwExternalLink())
  }

  function vwLogin (model, actions) {
    return [
      m('div', 'Login Page', ' | ', vwExternalLink()),
      m(
        'form',
        {
          onsubmit: function (e) {
            console.log(e)
            e.preventDefault()
            actions.authenticateUser(model.user.extId, model.user.secret) // NOTE: this redirects to base route '/'
          }
        },
        [
          m('label.label', 'Username'),
          m('input[type=text][placeholder=demo]', {
            oninput: m.withAttr('value', function (value) {
              model.user.extId = value
              console.info('username: ', model.user.extId)
            }),
            value: model.user.extId
          }),
          m('label.label', 'password'),
          m('input[type=password][placeholder=public&insecure]', {
            oninput: m.withAttr('value', function (value) {
              model.user.secret = value
              console.info('secret: ', model.user.secret)
            }),
            value: model.user.secret
          }),
          m(
            'button[type=submit]',
            {
              // onclick: actions.onNavigateTo.bind(null, 'Home', {}) // handled in submit via m.route.set()
            },
            'Save'
          )
        ]
      )
    ]
  }

  function vwItem (model, actions) {
    // let soll = model.data.soll ? model.data.soll : 'loading'
    return [
      m(
        'div',
        'Item Page - viewing item ' + model.params.id,
        ' | ',
        vwExternalLink()
      )
    ]
  }

  function vwExternalLink () {
    // return m("a[href='https://duckduckgo.com']", 'DuckDuckGo')
  }

  return view
})()

function createModel (settings) {
  return {
    routesDesc: settings.routesDesc,
    page: undefined,
    data: {},
    routeName: settings.routesDesc[0].name,
    params: {},
    user: {
      extId: undefined,
      secret: undefined,
      token: undefined
    }
  }
}

function createActions (model, dataApi) {
  return {
    onNavigateTo: onNavigateTo,
    authenticateUser: authenticateUser,
    setModelAttribute: setModelAttribute
  }

  function onNavigateTo (routeName, params) {
    console.info('route: ', routeName)
    model.page = routeName
    model.routeName = routeName
    Object.assign(model.params, params || {})
    model.data = {}

    if (routeName === 'Item') {
      if (!model.user.token) {
        let defaultToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlbW8iLCJpYXQiOjE1MDA3MzE3Mzd9.JqgauKlkjWEO89yrBd_9D9_zu6IDw4lKWVbhjJA4eXo'
        model.user.token = defaultToken
      }
      model.data = {}
      let ledger = '0x19BF166624F485f191d82900a5B7bc22Be569895'
      // let smpc = '0x2F516D1e3dcB330BB44c00cb919ab5081075C77E'
      let account = params.id
      fetchAccountBalance(ledger, account, model.user.token)
        .then(function () {
          fetchSoll(account)
          model.data['saldo'] = model.data.getSaldo()
        })
        .catch(function (err) {
          console.error(err)
        })
    }
    console.info('model (onNavigateTo):', model)
  }

  function authenticateUser (username, password) {
    let extId = username || 'demo'
    let secret = password || 'public&insecure'
    console.log('authenticateUser secret: ', secret)
    return dataApi
      .auth(extId, secret)
      .then(function (data) {
        model.user.token = data.token
        model.user.extId = extId
        model.user.secret = secret
        model.user['authLevel'] = data.auth === 'demo' ? 'readonly' : 'write'

        console.log(extId, ' authenticated.')
        console.log('auth response obj:  ', data)
        m.route.set('/') // TODO: Redirect to previous route
      })
      .then(function () {
        fetchPublicKey(model.user.extId, model.user.token)
      })
      .catch(function (err) {
        console.error(err)
        model.data['error'] = err
      })
  }

  function fetchPublicKey (extId, token) {
    return dataApi.fetchPublicKey(extId, token).then(function (data) {
      model.user['publicKey'] = data
      console.log(model.user)
    })
  }

  function fetchAccountBalance (ledger, account, token) {
    return Promise.all([
      dataApi.fetchAccountHaben(ledger, account, token),
      dataApi.fetchAccountSoll(ledger, account, token)
    ])
      .then(data => {
        model.data = {
          ledger: ledger,
          account: account,
          haben: data[0],
          soll: data[1],
          getSaldo: function () {
            return parseInt(this.haben) - parseInt(this.soll)
          }
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  function setModelAttribute (value, target) {
    target = value
    console.info(target)
  }

  function fetchItem (id) {
    return dataApi
      .fetchItem(id)
      .then(function (data) {
        model.data = data
        model.data['status'] = 'loaded via XHR'
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  function fetchSoll (id) {
    return (
      dataApi
        .fetchAccountSollBO(id)
        .then(function (data) {
          model.data['viaBO'] = data
          console.log('model.data after BO injection: ', model.data)
          m.redraw()
        })
        // return dataApi.fetchItem('3232').then(function (data) {
        //   model.data = data
        //   model.data.id = id
        //   model.data['status'] = 'custom message: fetched via fethchSoll'
        // })
        .catch(function (err) {
          console.error(err)
        })
    )
  }
}

function createRouteResolver (model, actions) {
  return model.routesDesc.reduce(function (acc, item) {
    acc[item.route] = {
      onmatch: function (params, route) {
        actions.onNavigateTo(item.name, params)
      },
      render: function () {
        return view(model, actions)
      }
    }
    return acc
  }, {})
}

/* Data API */

function createDataApi (settings, node) {
  return {
    fetchItem: function (id) {
      return m.request({
        type: 'GET',
        url: settings.apiHost + '/item/' + id
      })
    },
    auth: auth,
    fetchPublicKey: fetchPublicKey,
    fetchAccountHaben: fetchAccountHaben,
    fetchAccountSoll: fetchAccountSoll,

    // Business Obj
    fetchAccountSollBO: fetchAccountSollBO
  }

  function fetchAccountHaben (ledgerAddress, accountAddress, token) {
    return m.request({
      type: 'GET',
      url:
        settings.apiHost +
        '/stromkonto/:ledger/balancesHaben/' +
        accountAddress +
        '?token=' +
        token,
      data: {
        ledger: ledgerAddress,
        account: accountAddress
      }
    })
  }

  function fetchAccountSoll (ledgerAddress, accountAddress, token) {
    return m.request({
      type: 'GET',
      url:
        settings.apiHost +
        '/stromkonto/:ledger/balancesSoll/' +
        accountAddress +
        '?token=' +
        token,
      data: {
        ledger: ledgerAddress,
        account: accountAddress
      }
    })
  }

  function auth (extId, secret) {
    if (!extId || !secret) {
      console.error('submit username and password')
      return
    }
    return m.request({
      type: 'POST',
      url: settings.apiHost + '/auth/' + extId + '/' + secret
    })
  }

  function fetchPublicKey (extId, token) {
    return m.request({
      type: 'GET',
      url: settings.apiHost + '/info/' + extId + '?token=' + token
    })
  }

  function fetchLedgerBO () {
    return document.node.stromkonto(
      '0x19BF166624F485f191d82900a5B7bc22Be569895'
    )
  }

  function fetchAccountSollBO (address) {
    return fetchLedgerBO().then(function (ledger) {
      return ledger.balancesSoll(address)
    })
  }
}
