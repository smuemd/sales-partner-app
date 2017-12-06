export const createModel = (settings) => {
  return {
    routesDesc: settings.routesDesc,
    page: '',
    query: '',
    params: {},
    user: {
      extid: '',
      address: '',
      account: {
        username: '',
        password: '',
        decrypt: undefined,
        encrypt: undefined,
        wallet: {
          address: '',
          privateKey: '',
          sign: undefined
        },
        rsaPrivate: '',
        rsaPublic: ''
      },
      node: undefined
    },
    vm: {
      login: {
        authInProgress: false,
        msg: undefined,
        redirect: ''
      }
    }
  }
}
