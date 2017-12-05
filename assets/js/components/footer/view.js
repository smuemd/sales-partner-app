import m from 'mithril'

// export const createView = update => model =>

export const createView = function (actions) {
  return function (model) {
    return [
      m(
        'div', [
          m(
            'a', { href: '/login', oncreate: m.route.link }, 'I am a footer link.'
          ),
          m(
            'span', m('small', ' I am a link attribution.')
          )
        ]
      ),
      m(
        'div',
        m(
          'a',
          {
            href: 'javascript:void(0);' /* onclick: actions.someActions */
          },
          'Click me, I am a link!'
        )
      ),
      m(
        'div', model.user.extid && model.user.address
          ? 'extid: ' + model.user.extid + ' | address: ' + model.user.address
          : 'no user node'
      )
    ]
  }
}
