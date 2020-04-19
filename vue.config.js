const path = require('path');

const options = {
  type: 'vue',
  emoji: true,
  classPrefix: 'markdown-prefix',
  // mdUse: (md) => {
  //   console.log(md)
  // },
  wrapBlock: 'BlockWrap',
  wrapClass: 'markdown-wrap'
}

module.exports = {
  devServer: {
    port: 2333
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.md$/,
          oneOf: [
            {
              resourceQuery: /blockType=jsx/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {}
                },
                {
                  loader: path.resolve(__dirname, './lib/index'),
                  options: options
                }
              ]
            },
            {
              use: [
                {
                  loader: 'vue-loader',
                  options: {}
                },
                {
                  loader: path.resolve(__dirname, './lib/index'),
                  options: options
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
