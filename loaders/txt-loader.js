function txtLoader (content, map, meta) {
  console.log('开始执行-- txt-loader', content, map, meta)
  return `module.exports = '${content}'`
}

module.exports = txtLoader