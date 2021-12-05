let postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [postcssPresetEnv({
        browsers: 'last 10 version'
    })]
}