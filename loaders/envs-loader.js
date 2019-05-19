const getOptions = require('loader-utils').getOptions

module.exports = function(source) {
  const config = getOptions(this)
  if (config.isProd) {
    return source
  }

  const localEnvs = {
    $BASE_URL: 'http://127.0.0.1:8001',
    $TITLE: 'ЗАЛУ "Рубеж"',
  }
  const keys = Object.keys(localEnvs)
  keys.forEach(key => {
    source = source.replace(key, `'${localEnvs[key]}'`)
  })
  return source
}
