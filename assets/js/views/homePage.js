import m from 'mithril'
import User from '../model/user'

class HomePage {
  view (vnode) {
    if (User.isAuthenticated()) {
      return m('main', [
        m(
          'p',
          {
            class: 'pure-button pure-button-primary',
            id: 'loginBtn',
            href: '#'
          },
          `Welcome! ${window.localStorage.getItem('currentUserName') ||
            ''}, You're Logged In`
        ),
        m(
          'a',
          {
            class: 'pure-button pure-button-primary',
            href: '#',
            onclick: User.logout
          },
          'Logout'
        )
      ])
    } else {
      return m('main', [
        m('p', {}, 'Log In to Proceed'),
        m(
          'a',
          {
            class: 'pure-button pure-button-primary',
            href: '#',
            onclick: User.authorize
          },
          'Login'
        )
      ])
    }
  }
}

export default HomePage
