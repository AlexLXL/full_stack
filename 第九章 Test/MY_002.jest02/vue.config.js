const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // assetsDir: 'static',
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'src': resolve('./src'),
                'static': resolve('./static')
            }
        },
        plugins: [
            new CopyWebpackPlugin([
                    {
                        from: resolve("static"),
                        to: "static",
                    }
                ]
            )
        ],
    },
}