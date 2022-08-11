const analyzer = require('webpack-bundle-analyzer')
module.exports = {
  configureWebpack: {

    plugins: [
      // new analyzer.BundleAnalyzerPlugin()
    ],

    resolveLoader: {
      modules: ['node_modules', './loaders/']
    },
  },
  chainWebpack: config => {
    config.module
      .rule('text')
      .test(/\.txt$/)
      .use('txt-loader')
      .loader('txt-loader')
      .loader('a-loader')
      .end()
  }
  // chainWebpack: config => {
  //   config.module.rule('txtLoader').test(/\.txt$/).use('./loaders/txt-loader.js').use('./loaders/a-loader.js').end()
  // },
}