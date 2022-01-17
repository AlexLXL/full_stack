/**
 * @description 数据格式化
 * @author 学浪
 */
const {DEFAULT_PICTURE} = require('../conf/constant')

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

function formatUser(list) {
    if (list == null) {
        return list
    }

    // 数组
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}