import createDataApi from '../../dataApi'
import { onNavigateTo } from '../../actions'

const dataApi = createDataApi()
const node = () => dataApi.createNode('supersoft')

node().mpr().then(mpr => {
  mpr.readings(node().wallet.address)
    .then(res => console.log(res))
})

let update

export const createActions = (updte) => {
  update = updte
  return {
    authenticateUser: authenticateUser,
    onNavigateTo: onNavigateTo
  }
}

export function authenticateUser (username, password) {
  const accountObj = dataApi.createAccount(username, password)
  update((model) => {
    model.viewState.authInProgress = true
    return model
  })
  accountObj.wallet()
    .then(w => {
      // const node = () => dataApi.createNode(username, w.privateKey)
      update((model) => {
        const user = model.user
        user.extid = username
        user.account.address = w.address
        user.account.username = accountObj.username
        user.account.password = accountObj.password
        user.account.obj = accountObj
        Object.assign(user.account.wallet, w)
        model.viewState.authInProgress = false
        return model
      })
      console.log(w.address)
    })
    .catch(err => console.error(err))
}
