'use strict'

import m from 'mithril'

import vwHome from './vwHome'
import vwLogin from './vwLogin'
import vwItem from './vwItem'
import vwData from './components/vwData'

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
        route: '/item/0x4caB5660420BECAF280553b8c5634668379b81E0'
      }
    ]

    return m(
      'ul.nav',
      defaults.map(function (item) {
        let href = item.route
        return [
          m(
            'li' + isActive(item.name),
            m('a', {href: href, oncreate: m.route.link}, item.name)
          )
        ]
      })
    )

    function isActive (page) {
      return model.page === page ? '.active' : ''
    }
  }

  function vwPage (model) {
    return [
      model.page === 'Login'
        ? vwLogin()
        : model.page === 'Item' ? vwItem(model) : vwHome(),
      vwData(model)
    ]
  }

  return vwApp // <-- the only "exported" function
}

export default createView
