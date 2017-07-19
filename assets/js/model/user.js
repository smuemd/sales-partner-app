import { CLIENT_ID, DOMAIN, CALLBACK_URL } from '../config/auth0Conf'
import auth0 from 'auth0-js'

class User {
  static webAuth () {
    return new auth0.WebAuth({
      domain: DOMAIN,
      clientID: CLIENT_ID,
      redirectUri: CALLBACK_URL,
      audience: 'https://' + DOMAIN + '/userinfo',
      responseType: 'token id_token',
      scope: 'openid',
      leeway: 60,
      usePostMessage: false
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

  static handleAuthentication () {
    User.webAuth().parseHash(function (err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''
        User.setSession(authResult)
      } else if (err) {
        console.log(err)
      }
    })
  }

  static authorize () {
    User.webAuth().authorize()
  }
  static checkLogin () {
    User.handleAuthentication()
  }

  static logout () {
    if (window.localStorage) {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('id_token')
      window.localStorage.removeItem('expires_at')
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

export default User
