import m from 'mithril'

export const createView = (actions) => (model) => {
  return m('div', (model.viewState.authInProgress === false)
    ? [
      m('form',
        {
          onsubmit: (ev) => {
            ev.preventDefault()
            let form = ev.target
            let u = form.elements.username.value
            let p = form.elements.password.value
            actions.authenticateUser(u, p)
          }
        },
        m('div', [
          m('label', 'Username'),
          m(
            'input[type=text][name=username][placeholder=' +
            (model.user.extid || 'name@example.com') +
            ']'
          )
        ]),
        m('div', [
          m('label', 'Password'),
          m('input[type=password][name=password]')
        ]),
        m('button[type=submit]', 'Submit')
      )
    ]
  : m('div', 'loading account'))
}
