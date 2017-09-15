'use strict'

import m from 'mithril'

export default vwLogin

let model
let actions

function vwLogin (mdl, actns) {
  model = mdl
  actions = actns
  return m(
    'div.fl.w-third',
    'Login Page',
    model.user.extId && model.user.token
      ? m(
          'div',
          m(
            'button',
            {
              class:
                'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-bg-white hover-red',
              onclick: actions.logout
            },
            'Logout'
          )
        )
      : m(
          'form[action=https://fury.network/api/auth/][method=get]',
        {
          onsubmit: function (ev) {
            ev.preventDefault()
            let form = ev.target
            let username = form.elements.username.value
            let password = form.elements.password.value
            actions.authenticateUser(username, password)
          }
        },
          m(
            'fieldset',
            { class: 'ba b--transparent ph0 mh0' },
            m('legend', { class: 'f4 fw6 ph0 mh0' }, 'Sign In'),
            m(
              'div.mt3',
              m('label.label', { class: 'db fw6 lh-copy f6' }, 'Username'),
              m(
                'input[type=text][name=username][placeholder=' +
                  (model.user.extId || 'username@example.io') +
                  ']',
                {
                  class:
                    'pa2 input-reset ba bg-transparent hover-bg-gold hover-black w-100'
                }
              )
            ),
            m(
              'div.mv3',
              m('label.label', { class: 'db fw6 lh-copy f6' }, 'password'),
              m('input[type=password][name=password]', {
                class:
                  'b pa2 input-reset ba bg-transparent hover-bg-gold hover-black w-100'
              })
            )
          ),
          m(
            'button[type=submit]',
            {
              class:
                'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-bg-gold'
            },
            'Submit'
          )
        )
  )
}
