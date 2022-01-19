/**
 * @description 加密
 * @author 学浪
 */

const crypto = require('crypto')
const {CRYPTO_SECRET_KEY} = require('../conf/secretKeys')

/**
 * md5 加密
 * @param content 明文内容
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密
 * @param content 明文内容
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto