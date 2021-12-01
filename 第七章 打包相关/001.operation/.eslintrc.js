module.exports = {
    "extends":"airbnb",
    parser: "babel-eslint",
    env: {
        browser: true,
    },
    rules: {
        "indent": ["error", 4],//缩进风格
        "quotes": "off",//引号类型
        "no-console": "off",//禁止使用console
        "semi": "error",
        "linebreak-style": "off",
        "eol-last": "off"
    }
}