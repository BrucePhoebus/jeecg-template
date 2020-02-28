const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
	outputDir: 'jeecg-template',
	devServer: {
		port: 3000,
		publicPath: process.env.VUE_APP_BASE_URL,
		proxy: {
			'/jeecg-boot': {
				target: 'http://localhost:8080', //请求本地 需要jeecg-boot后台项目
				ws: false,
				changeOrigin: true
			},
		}
	},
	lintOnSave: undefined,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use()
      .loader('file-loader')
      .end()
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  },
}
