import pathToRegexp from 'path-to-regexp'
/**
 * 示例:
 *
 * var a = []
 * let reg = pathToRegexp('/user/:id/:name', a, {})
 * console.log(reg)
 * console.log(a)
 *
 * // OUTPUT:
 * //   /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i
 * //   [
 * //     { name: 'id', optional: false, offset: 7 },
 * //     { name: 'name', optional: false, offset: 22 }
 * //   ]
 *
 * let result = '/user/1/tom'.match(reg)
 * console.log(result)
 *
 * //   [
 * //     '/user/1/tom',
 * //     '1',
 * //     'tom',
 * //     index: 0,
 * //     input: '/user/1/tom',
 * //     groups: undefined
 * //   ]
 */

function compilePath(path, options) {
    const keys = [];
    const regexp = pathToRegexp(path, keys, options);
    return {regexp, keys};
}

function matchPath(pathname, options = {}) {
    const {path = "/", exact = false, strict = false, sensitive = false} = options;
    const {regexp, keys} = compilePath(path, {end: exact, strict, sensitive});
    const match = regexp.exec(pathname);
    if (!match) return null;
    const [url, ...values] = match;
    const isExact = pathname === url;
    if (exact && !isExact) return null;//如果希望精确，但其实不精确返回null
    return {
        path,//Route里的path属性
        url,//正则匹配到的浏览器的pathname部分
        isExact,//是否实现了精确匹配
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index]
            return memo;
        }, {})
    }
}

export default matchPath;