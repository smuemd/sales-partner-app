/* Test */
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const path = require('path')
const env = process.env.NODE_ENV

module.exports = {
  devtool: 'source-map',
  ignore: [
    '**/layout.html',
    '**/_*',
    '**/.*',
    '.*/**',
    'assets/css/css_modules/**',
    'readme.md',
    'yarn.lock',
    'package-lock.json',
    'coverage/**',
    '.nyc_output/**',
    '*.log'
  ],
  reshape: htmlStandards({
    locals: ctx => {
      return { pageId: pageId(ctx), foo: 'bar' }
    },
    minify: env === 'production'
  }),
  postcss: cssStandards({
    path: path.join(__dirname, './assets/css/css_modules'),
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards(),
  vendor: 'assets/vendor/**'
}
