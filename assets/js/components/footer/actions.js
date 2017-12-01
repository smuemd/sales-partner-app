import createDataApi from '../../dataApi'

export const createActions = (update) => {
  const dataApi = createDataApi()
  return {
    test: () => {
      update(function (model) {
        model.test = model.test === 'true' ? 'false' : 'true'
        return model
      })
    },

    setNode: () => {
      update((model) => {
        let userNode = dataApi.createNode('123')
        let user = model.user
        user.extid = '123'
        user.address = userNode.wallet.address
        user.privateKey = userNode.wallet.privateKey
        user.node = () => userNode
        console.log(userNode.wallet)
        return model
      })
    }
  }
}
