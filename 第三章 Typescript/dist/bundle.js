
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    /**
     * interface: 用于描述对象
     */
    let apple = {
        name: "苹果",
    };
    let appleStrange = {
        name: "奇怪的苹果",
        name02: '我多了一个字段'
    };
    let peach = {
        name: "桃子",
        price: 5,
        color: 'red'
    };
    // 3.4 满足条件就可以赋值
    let fruit = peach;
    console.log(apple);
    console.log(appleStrange);
    console.log(peach);
    console.log(fruit);
    function mixin(o1, o2) {
        return Object.assign(Object.assign({}, o1), o2);
    }
    let r1 = mixin({ a: 1 }, { a: 'aa', b: 'bb' });
    console.log(r1); // {a: 'aa', b: 'bb'}
    var interfaceKnowledge = {};

    // import baseData from './001.基础数据类型'
    // import gen from './005.泛型'
    // console.log(baseData)
    // console.log(fnType)
    // console.log(classKnowledge)
    console.log(interfaceKnowledge);
    // console.log(gen)
    // let aaa:string = '333'
    // console.log(aaa)
    // keyof any => string | number | symbol

})();
//# sourceMappingURL=bundle.js.map
