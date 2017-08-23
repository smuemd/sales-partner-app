'use strict'
import m from 'mithril'

/* Wait for DOM to load */
window.addEventListener('DOMContentLoaded', main)

// create main() function to prep up model, actions and routing
function main (start) {
  console.log('DOM fully loaded and parsed. Launching app ', start)

  const settings = {
    apiHost: document.StromDAOBO,
    nodeConfig: {
      external_id: '19810930',
      testMode: true,
      rpc: 'https://demo.stromdao.de/rpc',
      abilocation:
        'https://cdn.rawgit.com/energychain/StromDAO-BusinessObject/6dc9e073/smart_contracts/'
    },
    demoDefaults: {
      ledger: '0x19BF166624F485f191d82900a5B7bc22Be569895',
      smpc: '0x2F516D1e3dcB330BB44c00cb919ab5081075C77E',
      accounts: [
        {
          name: 'One',
          meta: 'UST',
          publicKey: '0x4caB5660420BECAF280553b8c5634668379b81E0'
        },
        {
          name: 'Two',
          meta: 'EEG',
          publicKey: '0x9B6084a9a35Fc638A67Fd43d6c73B9325263D2f5'
        },
        {
          name: 'Three',
          meta: 'Stromsteuer',
          publicKey: '0xE4Dd81107246BC8366a28b2F346c1F3C0146526d'
        },
        {
          name: 'Four',
          meta: 'Konzessionsabgabe',
          publicKey: '0xC3d7291E403703Ae8BbF1d924C854c60B617D611'
        },
        {
          name: 'Five',
          meta: 'KWK Umlage',
          publicKey: '0xAc67A65B42186284e3c1748927Ce2590ad51390b'
        },
        {
          name: 'Six',
          meta: '§19 Umlage',
          publicKey: '0x5be5c47D592f1eaE734c2f297a396bb5DE2610d5'
        },
        {
          name: 'Seven',
          meta: 'Logistik',
          publicKey: '0x6011229E95916A766DC525b68866CB082be4b252'
        }
      ]
    },
    routePrefix: '#',
    defaultRoute: '/',
    routes: [
      { name: 'Home', route: '/' },
      { name: 'Account', route: '/account/:publicKey' },
      { name: 'Test', route: '/test/:id' }
    ]
  }
  const model = createModel(settings)
  const dataApi = createDataApi(settings)
  const actions = createActions(model, dataApi)
  const routeResolver = createRouteResolver(model, actions)

  m.route.prefix(settings.routePrefix)

  m.route(document.body, settings.defaultRoute, routeResolver)
}

/* Model */

function createModel (settings) {
  return {
    routes: settings.routes,
    showPage: undefined,
    accountInfo: undefined,
    params: {},
    defaultAccounts: settings.demoDefaults.accounts
  }
}

function createDataApi (settings) {
  const node = new settings.apiHost.Node(settings.nodeConfig)
  return {
    fetchHaben: fetchHaben,
    fetchSoll: fetchSoll,
    fetchBalance: fetchBalance,
    fetchTx: fetchTx
  }

  function fetchLedger () {
    return node.stromkonto(settings.demoDefaults.ledger)
  }

  function fetchHaben (publicKey) {
    return fetchLedger().then(function (ledger) {
      return ledger.balancesHaben(publicKey)
    })
  }

  function fetchSoll (publicKey) {
    return fetchLedger().then(function (ledger) {
      return ledger.balancesSoll(publicKey)
    })
  }

  function fetchBalance (publicKey) {
    return Promise.all([fetchHaben(publicKey), fetchSoll(publicKey)])
      .then(data => {
        return {
          haben: data[0],
          soll: data[1]
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  function fetchTx (publicKey) {
    fetchLedger().then(function (ledger) {
      return ledger.historyPeer(settings.demoDefaults.smpc, publicKey, 1000)
    })
  }
}

/* Actions */

function createActions (model, dataApi) {
  return {
    onNavigateTo: onNavigateTo,
    fetchData: fetchAccountInfo,
    getAcountInfo: getAcountInfo
  }

  function onNavigateTo (routeName, params) {
    // model.page = routeName
    // model.params = params
    // let accountInfo = params

    if (!params.publicKey) {
      model.showPage = routeName
      model.accountInfo = undefined
    } else if (routeName === 'Account') {
      fetchAccountInfo(params.publicKey).then(data => {
        let accountInfo = {}
        accountInfo['soll'] = data.soll
        accountInfo['haben'] = data.haben
        accountInfo['address'] = params.publicKey
        model.showPage = routeName
        model.accountInfo = accountInfo
      })
    }
  }

  function fetchAccountInfo (account) {
    return dataApi.fetchBalance(account)
  }

  function getAcountInfo () {
    return model.accountInfo
  }
}

/* Route Resolver */

function createRouteResolver (model, actions) {
  return model.routes.reduce(function (acc, item) {
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

const view = (function (model, actions) {
  function view (model, actions) {
    return m('.app', viewPage(model, actions))
  }

  function viewPage (model, actions) {
    return model.showPage === 'Account'
      ? viewAccount(model, actions)
      : viewHome(model, actions)
  }

  function viewHome (model, actions) {
    let defaultAccounts = model.defaultAccounts
    return m('ul.nav', [
      defaultAccounts.map(function (item) {
        let href = '/account/' + item.publicKey
        return m(
          'li',
          m(
            'a',
            {
              href: href,
              oncreate: m.route.link,
              style: 'list-style: none; margin: 0'
            },
            item.name
          )
        )
      })
    ])
  }

  function viewAccount (model, actions) {
    let accountInfo = model.accountInfo
    return !accountInfo
      ? m('.Account', 'Loading...')
      : m('.Account', [
        m(
            'h1',
            { style: 'margin-button: 6rem;' },
            'VP Account: ' + accountInfo ? accountInfo.address : 'wrong'
          ),
        m('div', +accountInfo ? accountInfo.address : 'wrong')
      ])
  }

  return view
})()
