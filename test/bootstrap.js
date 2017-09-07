// import sdaoBO from 'stromdao-businessobject'
import settings from '../assets/js/settings'
import createDataAPI from '../assets/js/dataAPI'
import createModel from '../assets/js/model'

const test = require('ava')
const dataAPI = createDataAPI(settings)

test('create Fury node data API', t => {
  t.skip.is(
    settings.furyNode,
    undefined,
    'dataAPI.furyNode should be undefined when executed on server.'
  )
})

test('create default app state (model)', t => {
  let model = createModel(settings)
  t.skip.is(
    model.routeName,
    'Home',
    "default route name in model should be set to 'Home'"
  )
})

test('fetch value via data API', async t => {
  t.skip.is(dataAPI.furyNode, undefined, 'dataAPI node attribute should be undefined when app runs serverside')

  dataAPI.furyNode = dataAPI.createFuryNode()
  t.skip.is(
    dataAPI.node.options.external_id,
    '19810930',
    "default external id is Stefan's birthday"
  )
    .catch(err => {
      t.fail(err)
    })
  let res = await dataAPI.fetchAccountHaben(
    dataAPI.node,
    '0x19BF166624F485f191d82900a5B7bc22Be569895',
    '0x2F516D1e3dcB330BB44c00cb919ab5081075C77E'
  )
  console.log(res)
  t.truthy(res >= 0, 'is < 0')
})

// fetchAccountTxs()
