import createDataApi from '../../dataApi'
import { onNavigateTo} from '../../actions'

const dataApi = createDataApi()
let update

export const createActions = (updte) => {
  update = updte
  return {
    authenticateUser: authenticateUser,
    onNavigateTo: onNavigateTo
  }
}

export function authenticateUser (username, password) {
  const node = () => dataApi.createNode(username)
  const userAccount = {
    username: username,
    password: password,
    wallet: {}
  }
  update((model) => {
    model.viewState.authInProgress = true
    return model
  })
  dataApi.createAccount(username, password).wallet()
    .then(w => {
      Object.assign(userAccount.wallet, w)

      update((model) => {
        let user = model.user
        let viewSate = model.viewState
        user.extid = username
        user.address = node().wallet.address
        user.privateKey = node().wallet.privateKey
        viewSate.authInProgress = false
        return model
      })
    })
    .then(() =>
      onNavigateTo('Account', {address: parseInt((Math.random() * 1000000000000), 10)})
    )
    .catch(err => console.error(err))
}
