
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    function toArray(val) {
        if (typeof val === 'string') {
            return val.split('');
        }
        else {
            return val.toString().split('').map(item => +item);
        }
    }
    toArray(123);
    var fnType = {};

    // import baseData from './001.基础数据类型'
    // console.log(baseData)
    console.log(fnType);
    // let aaa:string = '333'
    // console.log(aaa)

})();
//# sourceMappingURL=bundle.js.map
