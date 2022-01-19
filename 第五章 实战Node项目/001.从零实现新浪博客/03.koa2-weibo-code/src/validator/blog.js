/**
 * @description blog 数据格式验证
 * @author 学浪
 */

const _validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255,
        }
    }
}

function blogValidate(data = {}) {
    return _validate(SCHEMA, data)
}

module.exports = blogValidate