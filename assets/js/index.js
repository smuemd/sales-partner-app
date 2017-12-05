import { trace } from 'meiosis'
import m from 'mithril'
import stream from 'mithril/stream'

import { settings } from './settings'
import { createModel } from './model'
// import * as furyRPC from './furyRPC'
// import { createActions } from './actions'
import { createRouter } from './router'
import { createApp } from './app'

const model = createModel(settings)
const update = stream()
// const actions = createActions(update) // no global actions
const view = createApp(update)

const router = createRouter(update)

const applyUpdate = function (mdl, mdlUpdate) { return mdlUpdate(mdl) }
const models = stream.scan(applyUpdate, model, update)

models.map(router.routeSync)
models.map((model) =>
  m.render(document.querySelector('main'), view(model))
)

if (process.env.NODE_ENV !== 'production') {
  trace({ update, dataStreams: [ models ] })
}
