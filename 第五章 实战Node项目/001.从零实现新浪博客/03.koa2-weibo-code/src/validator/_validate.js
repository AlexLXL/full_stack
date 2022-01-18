/**
 * @description json schema 校验
 * @author 学浪
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 输出所有错误, 比较慢
})

function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate