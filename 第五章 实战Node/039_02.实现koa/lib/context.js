/**
 * 把属性都挂带ctx上
 */
let context = {}
function defineGetter(target, key) {
    context.__defineGetter__(key, function() {
        return this[target][key]
    })
}
function defineSetter(target, key) {
    context.__defineSetter__(key, function(val) {
        this[target][key] = val
    })
}

defineGetter('request', 'query')
defineGetter('request', 'path')
defineGetter('response', 'body')

defineSetter('response', 'body')

module.exports = context