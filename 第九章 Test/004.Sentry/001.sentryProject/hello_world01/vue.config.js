const SentryCliPlugin = require('@sentry/webpack-plugin');
module.exports = function override(config, env) {
    config.devtool = 'source-map';
    config.plugins.push(

    );
    return config;


}

module.exports = {
    productionSourceMap: true,
    configureWebpack: {
        plugins: [
            new SentryCliPlugin({
                release: 'pro@1.0.1',
                authToken: 'cd9d14fe889948bd84122d6c9603963c6ada0526777a441f9bd534d522249bd6',
                url: 'http://192.168.0.100:9000',
                org: 'test_organization',
                project: 'hello-world',
                urlPrefix: '~/',
                include: './dist',
                ignore: ['node_modules'],
            })
        ],
    },
}