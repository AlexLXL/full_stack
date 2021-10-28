const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
            }
        }
    },
    /**
     * css-loader
     * 1.引入全局配置
     */
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/assets/css/reset.scss";
                @import "@/assets/css/animation.scss";
                ` // 新版scss-loader(8.0及以上)
                // data: '@import "@/assets/css/vars.scss";' // 旧版sass-loader写法(8.0以下)
            }
        }
    }
}