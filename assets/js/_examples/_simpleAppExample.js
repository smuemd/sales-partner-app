'use strict'
import m from 'mithril'

/**
 *
 * Mithril app structure example
 * via https://github.com/pakx/the-mithril-diaries
 *
 */

/**
 * (1) Single Application-level Model
 *
 * => a single "model" to track 2 bits of data:
 *    (a) the message to display, and
 *    (b) the number of times the button is clicked.
 */

function createModel () {
  return {
    clickCount: 0,
    msg: 'Hello, word from Mithril'
  }
}

/**
 * (2) Consolidated App Actions
 *
 * => extract/consolidate application behavior/logic into a single entity.
 * => pass in the model, so actions can operate on passed in data rather than reaching out.
 */

function createActions (model) {
  return {
    onButtonClick: onButtonClick
  }

  function onButtonClick () {
    model.clickCount += 28
    model.msg = model.msg.toUpperCase()
  }
}

/**
 *
 * (3) Single single `view()` function broken out into modular sub-views.
 *
 * => encapsulate modularity in an IIFE (note the return view toward its end)
 * => pass that app-model into the view function, so view operates on passed-in data
 *    rather than reach out and access a global variable
 * => TODO: use ES6 or CommonJS modules in favor of IIFE
 */

const view = (function () {
  function view (model, actions) {
    return viewApp(model, actions)
  }

  function viewApp (model, actions) {
    return {
      view: function () {
        return m('.app', [viewHeader(), viewBody(model, actions), viewFooter()])
      }
    }
  }

  function viewHeader () {
    return m('.header', '(Headerrrr)')
  }

  function viewBody (model, actions) {
    return m('.body', [
      m('.message', model.msg),
      m('.clickCount', model.clickCount),
      m('button.btn', { onclick: actions.onButtonClick }, 'click me')
    ])
  }

  function viewFooter () {
    return m('.footer', '(Fooooter)')
  }

  return view // <-- the only "exported" function
})()

/**
 * Putting It All Together
 *
 * (1) set up an initial model
 * (2) create an actions object
 * (3) then pass model and actions objects into the view
 *
 *  I choose to use a main() function, which itself is called from
 *  window.addEventListener("DOMContentLoaded", ...). YMMV.
 */

window.addEventListener('DOMContentLoaded', main)

function main (event) {
  console.log('DOM fully loaded and parsed ', event)
  // (1) set up an initial model  to pass into actions and view on mount.
  let model = createModel()
  // (2) create actions object to pass into the view on mount.
  let actions = createActions(model)
  // (3) mount the view() function with Mithril's m.mount(); pass in model and actions objects
  m.mount(document.body, view(model, actions))
}

/**
 *
 * Unidirectional Data Flow
 *
 * NOTE: Notice the sequence of events, and the resulting unidirectional data flow:
 * 1) we start with a model
 * 2) based on that model we render a view
 * 3) user interactions with the view -- and more generally any outside input -- is
 *    sent to an actions object
 * 4) based on that input the actions object updates the model
 *
 * ... and we're back to step 1!
 */
