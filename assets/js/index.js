import { trace } from 'meiosis'

import m from 'mithril'
import stream from 'mithril/stream'

import { settings } from './settings'
import { createModel } from './model'
import { createDataApi} from './dataApi'
import { createActions } from './actions'
import { createRouter } from './router'
import { createApp } from './app'

const model = createModel(settings)
const update = stream()
// const actions = createActions(update)
const view = createApp(update)

// router
const router = createRouter(update)

const models = stream.scan(
  function (mdl, mdlUpdate) { return mdlUpdate(mdl) }, model, update
)

models.map(router.routeSync)
models.map(function (model) {
  m.render(document.querySelector('main'), view(model))
})

if (process.env.NODE_ENV !== 'production') {
  trace({ update, dataStreams: [ models ] })
}
