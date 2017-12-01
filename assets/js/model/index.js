export const createModel = function (settings) {
  return {
    redirect: false,
    routesDesc: settings.routesDesc,
    page: '',
    query: '',
    params: {},
    user: {
      account: {
        username: '',
        password: '',
        wallet: {
          address: '',
          privateKey: ''
        },
        rsaPublic: '',
        rsaPrivate: ''
        },
      address: '',
      extid: '',
      privateKey: '',
    },
    viewState: {
      authInProgress: false
    }
  }
}
