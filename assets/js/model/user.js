import { CLIENT_ID, DOMAIN, CALLBACK_URL } from '../config/auth0Conf'
import auth0 from 'auth0-js'
import m from 'mithril'

class User {
  static webAuth () {
    return new auth0.WebAuth({
      domain: DOMAIN,
      clientID: CLIENT_ID,
      redirectUri: CALLBACK_URL,
      audience: 'https://' + DOMAIN + '/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile email',
      leeway: 60,
      usePostMessage: false
    })
  }

  static currentUserName () {
    return window.localStorage.getItem('currentUserName') || 'User'
  }

  static currentUserEmail () {
    return window.localStorage.getItem('currentUserEmail') || 'User'
  }

  static createCurrentUser (authResult) {
    User.webAuth().client.userInfo(authResult.accessToken, function (
      err,
      userInfo
    ) {
      window.localStorage.setItem('currentUserName', userInfo.name)
      window.localStorage.setItem('currentUserEmail', userInfo.email)
      m.redraw()
    })
  }

  static setSession (authResult) {
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    if (window.localStorage) {
      window.localStorage.setItem('access_token', authResult.accessToken)
      window.localStorage.setItem('id_token', authResult.idToken)
      window.localStorage.setItem('expires_at', expiresAt)
    }
  }

  static checkLogin () {
    User.webAuth().parseHash(function (err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''
        User.setSession(authResult)
        User.createCurrentUser(authResult)
      } else if (err) {
        console.log(err)
      }
    })
  }

  static authorize () {
    User.webAuth().authorize()
  }

  static logout () {
    if (window.localStorage) {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('id_token')
      window.localStorage.removeItem('expires_at')
      window.localStorage.removeItem('currentUserName')
      window.localStorage.removeItem('currentUserEmail')
    }
  }

  static isAuthenticated () {
    let authenticated = false
    if (window.localStorage) {
      var expiresAt = JSON.parse(window.localStorage.getItem('expires_at'))
      authenticated = new Date().getTime() < expiresAt
    }
    return authenticated
  }
}

User.checkLogin()

export default User
