'use strict'
import m from 'mithril'

export const createView = actions => model => {
  let defaults = {
    '/account/:address': '/account/99',
    Account: { address: '99' }
  }
  const isActive = page => {
    return model.page === page ? '.active' : ''
  }

  // nav
  return [
    m('nav', { class: 'db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns' }, [
      model.user.extid && model.user.address
        ? [
          // show extid
          m('div', { class: 'dib mr4 mt0' }, [
            m('span', { class: 'f6 db' }, 'Abrechnungsjahr'),
            m('span', { class: 'f6 db b' }, new Date().getFullYear())
          ]),
          // show authLevel
          m('div', { class: 'dib mr4 mt0' }, [
            m('span', { class: 'f6 db' }, 'Angemeldet als'),
            m('span', { class: 'f6 db b' }, model.user.extId)
          ]),
          // show logout
          m(
            'div',
            { class: 'v-top dib mt0 grow vtop', onclick: actions.logout },
            m(
              'a',
              {
                class: 'f6 fw6 link black-70 mr2 mr3-m mr4-l dib pointer'
              },
              'Logout'
            )
          )
        ]
        : [
          model.routesDesc.map(item => {
            let href = defaults[item.route] || item.route
            return m(
              'div',
              {
                class: 'v-top dib mt0 grow vtop  pointer',
                href,
                oncreate: m.route.link
              },
              m(
                'a',
                {
                  class: 'grow f6 fw6 link v-top black-70 mr2 mr3-m mr4-l dib'
                },
                item.name
              )
            )
          })
        ]
    ])
  ]
}
