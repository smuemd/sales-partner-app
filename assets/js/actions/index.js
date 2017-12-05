let update

export function createActions (updte) {
  update = updte
  return {
    onNavigateTo: onNavigateTo
  }
}

/**
 *
 * @param {string} page
 * @param {{object}, string} params
 */
export function onNavigateTo (page, params) {
  console.info('new route triggerd: ', page, ' ', params)

  update(function (model) {
    model.page = page
    Object.assign(model.params, params)
    model.query = window.location.href.split('?')[1]
      ? '?' + window.location.href.split('?')[1]
      : ''
    return model
  })
}
