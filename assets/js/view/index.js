'use strict'

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
