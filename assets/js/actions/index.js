'use strict'
import m from 'mithril'

/**
 * Create actions
 *
 * @param model
 * @param dataAPI
 * @returns {{onNavigateTo: onNavigateTo, log}}
 *
 * export public actions methods that mutate the model
 *
 */
export default function createActions (model, dataAPI) {
  return {
    onNavigateTo: onNavigateTo(model, dataAPI),
    log: logOnNavigate(model)
  }
}

/**
 * onNavigateTo Wrapper
 *
 * @param model
 * @param dataAPI
 * @returns {Function}
 */
function onNavigateTo (model, dataAPI) {
  /**
   * OnNavigateTo function
   *
   * @param routeName
   * @param params
   *
   * Public method
   * Get called by route resolver on every route change
   *
   * 1. sets routeName and page properties in the model
   * 2. sets route parameters in the model
   * 3. Fetches account debit value from a Fury leger contract by calling fetchAccountSoll method via dataAPI
   * 4. Injects ledger account information into model data property
   * 5. Manually re-renders the view with m.redraw()
   */
  return function (routeName, params) {
    console.info('route: ', routeName)
    model.routeName = routeName /* 1 */
    model.page = routeName /* 2 */
    Object.assign(model.params, params || {})

    if (routeName === 'Item') {
      let ledger = '0x19BF166624F485f191d82900a5B7bc22Be569895'
      let account = params.id

      dataAPI.boFetchAccountSoll(ledger, account) /* 3 */
        .then(function (soll) {
          model.data = {
            ledger: ledger,
            account: account,
            soll: soll,
            haben: undefined,
            saldo: undefined
          } /* 4 */
          m.redraw() /* 5 */
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  }
}

/**
 * logOnNavigate wrapper
 *
 * public test method defined outside create actions function scope
 * 1. returns method to log model and route information in the console on every route change.
 * 2. console log the full model
 * 2. console log route type (item)
 * 3. console log route params
 *
 * @param model
 * @returns {Function}
 */

function logOnNavigate (model) {
  return function (itemName, params) {
    console.info('model:  ', model)
    console.info('itemName:  ', itemName)
    console.info('params:  ', params)
  }
}
