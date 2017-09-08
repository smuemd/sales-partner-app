# Sales partner app

[![Build Status](https://travis-ci.org/smuemd/sales-partner-app.svg?branch=master)](https://travis-ci.org/smuemd/sales-partner-app) [![Coverage Status](https://coveralls.io/repos/github/smuemd/sales-partner-app/badge.svg?branch=master)](https://coveralls.io/github/smuemd/sales-partner-app?branch=master)

A web application to manage sales commissions the STROMDAO Energy Blockchain.

## Setup

- make sure [node.js](http://nodejs.org) is at version >= `6`
- clone this repo down and `cd` into the folder
- run `yarn install ` or `npm install`
- run `spike watch` or `spike compile`
- this compiles the application into a folder `public`

## Testing

Tests are located in `test/**` and are powered by [ava](https://github.com/avajs/ava)
- `yarn install ` or `npm install` to ensure devDeps are installed
- `npm test` to run test suite
- [TODO] add window object to test clientside javascript Node.js test framework. => https://www.npmjs.com/package/window

## App structure

### HTML

HTML template files are located in the `views` folder and are powerd by [Reshape Standard](https://github.com/reshape/standard)
- Note the `<script src='https://unpkg.com/stromdao-businessobject@latest/dist/loader.js'></script>` in `views/layout.html`. This provides version of the [STROMDAO Business Object](https://github.com/energychain/StromDAO-BusinessObject) that works locally inside the browser and acts a a mayor interface to the STROMDAO blockchain network.
- besides this there is not much going on the actual app is 100% Javascript and gets mounted below the `<div id='app'></div>` tag in `views/index.html`

### CSS

Stylesheets are located in `assets/css`. [PostCSS](https://github.com/postcss/postcss)  is being utilized.
- Styles try to adhere to [SuitCss](https://github.com/suitcss/suit) conventions. An example component and utility are provided in `assets/css/css_modules`
- [TODO add tachyons]

### JavaScript

JS files are located in `assets/js`. The front end libary is [Mithril](https://github.com/MithrilJS/mithril.js/issues) the app structure is based on [pakx Basic App Structure](https://github.com/pakx/the-mithril-diaries/wiki/Basic-Mithril-App-Structure)

#### Index.js
`assets/js/index.js` is where everything is being put together: The app consists of:
1. Some basic settings
2. A state model 
3. Some dedicated dataAPI methods for interacting with the blockchain
4. actions for manipulating the state model
5. Views that automatically render based on model changes
6. A simple route resolver for client side routing.


Whereby the state model is set up first via a createModel() function, then we create an actions object, then pass both those into the view. 
  
##### App structure example
       
Note that a `main()` function is being used , which itself is called from `window.addEventListener("DOMContentLoaded", ...)`.
Also note that we are using Mithrils [m.route()]() to automatically redraw the UI  and facilitate client site routing.

```js

// assets/js/index.js
import m from 'mithril'
import settings from './settings'
import createModel from './model'
import createDataAPI from './dataAPI'
import createActions from './actions'
import createView from './view'
import createRouteResolver from './routes'

window.addEventListener('DOMContentLoaded', main())

function main () {
  const model = createModel(settings)
  const dataAPI = createDataAPI(settings)
  const actions = createActions(model, dataAPI)
  const view = createView()
  const routeResolver = createRouteResolver(model, actions, view)
  const defaultRoute = settings.defaultRoute

 
  m.route(document.querySelector('main'), defaultRoute, routeResolver)
}

```
Notice the sequence of events, and the resulting unidirectional data flow:

1. we start with a model
2. based on that model we render a view
3. user interactions with the view -- and more generally any outside input -- is sent to an actions object
4, based on that input the actions object updates the model
... and we're back to step 1!

![unidirectional data flow](https://github.com/pakx/the-mithril-diaries/wiki/article-basic-mithril-app-structure/images/unidirectional-data-flow.png)

#### Settings
The settings object holds some basic configuration data. It is used to initialize the model, dataAPI and actions objects. nothing special here.


#### Model
We are working with a single app-level model object that holds the application state. 
- During initialization we are looking for localStorage items to populate some key model attributes. Thus allowing sessions.

##### createModel function

```js

// assets/js/model/index.js

const localStore = window.localStorage
let extId = localStore.getItem('user:extId') || undefined
let token = localStore.getItem('user:token') || undefined

function createModel (settings) {
  return {
    page: undefined,
    routesDesc: settings.routesDesc, /* 1 */
    routeName: settings.routesDesc[0].name,
    routeRedirect: false,
    params: {},
    user: {
      extId: extId,
      token: token,
      authLevel: undefined,
      localNode: {
        __persistentAddress: undefined,
        __persistentPk: undefined,
        address: localStore.getItem('user[' + extId + ']:localNode:address') || undefined,
        pk: localStore.getItem('user[' + extId + ']:localNode:pk') || undefined
      },
      remoteNode: {
        address: localStore.getItem('user[' + extId + ']:remoteNode:address') || undefined,
      }
    },
    partnerAccount: {
      status: undefined,
      address: localStore.getItem('user[' + extId + ']:remoteNode:address') || undefined,
      haben: undefined,
      soll: undefined,
      saldo: undefined,
      transactions: undefined
    }
  }
}

``` 

#### Data API

A dataAPI object is utilized for working with external resources. This is where the applications connects with the blockchain backend. The dataAPI object is passed to the actions object, where the API methods are being called.
- Note that the dataAPI provides an abstraction over two distinct APIs that both connect the app to a full blockchain server.
- The first is a vanilla REST API that is specifically used for authenticating the client application and user. [m.request]() is being used to make the actual XHR calls.
- The second API uses the STROMDAO Business Object (a full blown client side blockchain wallet) to connect to sthe JSON RPC interface of a fat blockchain node.

##### dataAPI REST Methods (remote node)

```js

// assets/js/dataAPI/index.js

function authenticateUser (extId, secret) {
  if (!extId || !secret) {
    throw Error('submit username and password')
  }
  return m.request({
    type: 'POST',
    url: settings.apiHost + '/auth/:extId/:secret',
    data: {
      extId: extId,
      secret: secret
    }
  })
}

function fetchRemoteNodeInfo (extId, token) {
  return m.request({
    type: 'GET',
    url: settings.apiHost + '/info/' + extId + '?token=' + token
  })
}

```

##### dataAPI example of initilizing and using the Business Object API (local node)

```js

// assets/js/dataAPI/index.js
function createLocalNode (externalId) {
  if (!isServer) {
    return new settings.businessObject.Node(settings.createBusinessObjectConfig(externalId))
  } else {
    return undefined
  }
}

function mountLedger (furyNode, ledgerAddress) {
  return furyNode.stromkonto(ledgerAddress) /* 1 */
}

function fetchAccountSoll (furyNode, ledgerAddress, accountAddress) {
  return mountLedger(furyNode, ledgerAddress) 
    .then(function (ledger) {
      return ledger.balancesSoll(accountAddress)
    })
}

```

#### Actions

The actions object consolidates all app behavior/logic within a single entity. Since these actions operate on the model the previously created state model gets passed in and closured over along with the data API object.

##### Actions excerpt

- here we see a typical actions method that first fetches some external resources from the blockchain and then updates the Model with the fetched data.
- the the [m.redaw()]() call towards the end for manually redrawing the view after the Promise resolves.

```js

// assets/js/actions/index.js

[...]
function fetchAccountData (accountAddress) {
  let node = dataApi.furyNode
  let ledger = '0x19BF166624F485f191d82900a5B7bc22Be569895' // TODO derive form settings
  let account = accountAddress || window.localStorage.getItem('user[' + model.user.extId + ']:remoteNode:address')
  
  Promise.all([
    dataApi.fetchAccountTxHistory(node, ledger, account, 7504),
    dataApi.fetchAccountHaben(node, ledger, account),
    dataApi.fetchAccountSoll(node, ledger, account)
  ])
    .then((a) => {
      a.push((a[1] - a[2]))
      Object.assign(model.partnerAccount, {
        address: account,
        haben: setValue(a[1]),
        soll: setValue(a[2]),
        saldo: setValue(a[3]),
        transactions: a[0],
        status: { message: 'loaded', timestamp: Date.now() }
      })
      m.redraw()
    })
    .catch(function (err) {
      console.error(err)
    })
}

[...]

```

#### View

The view returns an idempotent view function that renders the entire UI per passed in model.
- using a createView() factory function that subsumes sub-views facilitates breaking the GUI into modular UI snippets 
- The app state model and app actions get passed into the view function (and as necessary to sub-views) so that the view operates on passed-in data rather than reach out and access a global variable. 

##### View function

- Note the return vwApp, which is the view-function that `createView()` returns 

```js

// assets/js/view/index.js
import m from 'mithril'
import vwHome from './vwHome'
import vwLogin from './vwLogin'
import vwItem from './vwItem'
import vwData from './components/vwData'

export default createView

function createView () {
  function vwApp (model, actions) {
    return m('main.app', vwNav(model), vwPage(model, actions))
  }

  function vwNav (model) {
    let defaults = [
      {name: 'Home', route: '/'},
      {name: 'Login', route: '/login'},
      {
        name: 'Item',
        route: '/item/0x2F516D1e3dcB330BB44c00cb919ab5081075C77E'
      }
    ]

    return m(
      'ul.nav',
      defaults.map(function (item) {
        let href = item.route
        return [
          m('li' + isActive(item.name),
            m('a', { href: href, oncreate: m.route.link }, item.name)
          )
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
        : model.page === 'Item' ? vwItem(model) : vwHome(),
      vwData(model)
    ]
  }

  return vwApp // <-- the only "exported" function
}
```

#### Routing

The app uses we'll use [m.route()]() and a [RouteResolver]() in order to facilitate client side routing.
- In [routeResolver.onmatch]()  a method of the actions object is called (route-changes are treated as "outside input" throughout), the actions object then updates model, which will then be rendered by the view() function.

##### routeResolver 

- Note that routes accept route- and  query-parameters.
- Also note  that the RouteResolver gets 'generated' rather than hand-crafted via a .reduce() function. If we have unique route names this is a "pattern" that may be repeated across various apps.

```js

// assets/js/routes/index.js

export default createRouteResolver

function createRouteResolver (model, actions, view) {
  return model.routesDesc.reduce(function (acc, item) {
    acc[item.route] = {
      onmatch: function (params, route) {
        actions.onNavigateTo(item.name, params)
=      },
      render: function () {
        return view(model, actions)
      }
    }
    return acc
  }, {})
}

```

[TODO] Explain authentication flow using the REST API.
