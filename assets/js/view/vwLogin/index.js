'use strict'

import m from 'mithril'

export default vwLogin

let model
let actions

function vwLogin (mdl, actns) {
  model = mdl
  actions = actns
  return m('div', 'Login Page',
    (model.user.extId && model.user.token)
      ? m('div',
        m('button', { onclick: actions.logout }, 'Logout')
      )
      : m('form[action=https://fury.network/api/auth/][method=get]',
        { onsubmit: function (ev) {
          ev.preventDefault()
          let form = ev.target
          let username = form.elements.username.value
          let password = form.elements.password.value
          actions.authenticateUser(username, password)
        }},
        m('label.label', 'Username'),
        m('input[type=text][name=username][placeholder=' + (model.user.extId || 'username@example.io') + ']'),
        m('label.label', 'password'),
        m('input[type=password][name=password]'),
        m('button[type=submit]', 'Submit')
      )
  )
}
