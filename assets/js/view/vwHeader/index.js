'use strict'

import m from 'mithril'

export default vwHeader

let model
let actions

function vwHeader (mdl, actns) {
  model = mdl
  actions = actns

  return m('header', { class: 'w-100 bg-white' }, [
    // logo
    m(
      'div',
      { class: 'db dt-ns mw9 center w-100' },
      m(
        'div',
        { class: 'db dtc-ns v-mid tl w-50' },
        m(
          'a',
          { class: 'dib f5 f4-ns fw6 mt0 mb1 link black-70' },
          'Sales PartnerApp'
        )
      ),
      // nav
      [
        m('nav', { class: 'db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns' }, [
          m(
            'div',
            { class: 'v-top dib mt0 grow vtop  pointer', href: '/' },
            m(
              'a',
              {
                class: 'grow f6 fw6 link v-top black-70 mr2 mr3-m mr4-l dib'
              },
              'Home'
            )
          ),
          model.user.extId && model.user.token
            ? [
              // show extid
              m('div', { class: 'dib mr4 mt0' }, [
                m('span', { class: 'f6 db' }, 'Logged in as:'),
                m('span', { class: 'f6 db b' }, model.user.extId)
              ]),
              // show authLevel
              m('div', { class: 'dib mr4 mt0' }, [
                m('span', { class: 'f6 db' }, 'Auth Level:'),
                m('span', { class: 'f6 db b' }, model.user.authLevel)
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
            // or show login if no extid
            : [ m(
                'div',
                { class: 'v-top dib mt0 grow vtop  pointer', href: '#!/login' },
                m(
                  'a',
                  { class: 'grow f6 fw6 link v-top black-70 mr2 mr3-m mr4-l dib' },
                  'Login'
                )
              )
            ]
        ])
      ]
    )
  ])
}
