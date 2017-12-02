export const createModel = function (settings) {
  return {
    redirect: false,
    routesDesc: settings.routesDesc,
    page: '',
    query: '',
    params: {},
    user: {
      account: {
        address: '',
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
      node: undefined
    },
    viewState: {
      authInProgress: false
    }
  }
}
