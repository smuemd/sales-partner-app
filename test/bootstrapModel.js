import settings from '../assets/js/settings'
import createModel from '../assets/js/model'

const test = require('ava')

test('bootstrap model with settings', t => {
  let model = createModel(settings)
  console.info(model)
  t.is(
    model.routeName,
    'Home',
    "default route name in model should be set to 'Home'"
  )
})
