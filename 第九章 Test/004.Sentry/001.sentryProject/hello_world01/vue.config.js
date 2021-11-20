const SentryCliPlugin = require('@sentry/webpack-plugin');

let prod = {
    configureWebpack: {
        devtool: "source-map",
        plugins: [
            new SentryCliPlugin({
                release: 'pro@1.0.6',
                authToken: 'cd9d14fe889948bd84122d6c9603963c6ada0526777a441f9bd534d522249bd6',
                url: 'http://192.168.0.106:9000',
                org: 'test_organization',
                project: 'hello-world',
                urlPrefix: '~/',
                include: './dist',
                ignore: ['node_modules'],
            })
        ],
    },
}

let test = {
    configureWebpack: {
        devtool: "source-map",
        plugins: [],
    },
}

module.exports = (process.env.NODE_ENV === 'prod') ? prod : test