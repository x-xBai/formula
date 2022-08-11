function aLoader (source, map, meta) {

  console.log('aloader ----- ', this, source, map, meta)

  return source + '; a-loader'
}
module.exports = aLoader