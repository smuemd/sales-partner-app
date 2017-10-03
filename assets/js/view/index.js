'use strict'

import m from 'mithril'

import vwHome from './vwHome'
import vwLogin from './vwLogin'
import vwHeader from './vwHeader'
import vwAccount from './vwAccount'
import vwInvoice from './vwInvoice'
import vwData from './components/vwData'

export default createView

let test = true

function createView () {
  function vwApp (model, actions) {
    return m('main.app', vwPage(model, actions))
  }

  /* TODO: this is not used at the moment. however, we have a header in the app */
  // function vwNav (model) {
  //   let defaults = [
  //     { name: 'Home', route: '/' },
  //     { name: 'Login', route: '/login' },
  //     {
  //       name: 'Account',
  //       route: '/account/0x2F516D1e3dcB330BB44c00cb919ab5081075C77E'
  //     }
  //   ]
  //
  //   return m(
  //     'ul.nav',
  //     defaults.map(function (item) {
  //       let href = item.route
  //       return [
  //         m(
  //           'li' + isActive(item.name),
  //           m('a', { href: href, oncreate: m.route.link }, item.name)
  //         )
  //       ]
  //     })
  //   )
  //
  //   function isActive (page) {
  //     return model.page === page ? '.active' : ''
  //   }
  // }

  function vwPage (model, actions) {
    return [
      vwHeader(model, actions),
      model.page === 'Login'
        ? vwLogin(model, actions)
        : model.page === 'Account'
          ? vwAccount(model, actions)
          : model.page === 'Invoice' ? vwInvoice(model) : vwHome(),
      test ? vwData(model) : ''
    ]
  }

  return vwApp // <-- the only "exported" function
}
