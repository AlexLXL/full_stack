(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function isFunction(val) {
      return typeof val === "function";
    }
    function isObject(val) {
      return typeof val === "object" && val !== null;
    }
    function isArray$1(val) {
      return Array.isArray(val);
    }

    let oldArrayPrototype = Array.prototype;
    let arrayMethods = Object.create(oldArrayPrototype);
    let methods = ["push", "pop", "unshift", "shift", "reverse", "sort", "splice"];
    methods.forEach(method => {
      arrayMethods[method] = function (...args) {
        oldArrayPrototype[method].apply(this, args); // 对增加的元素进行监听

        let addElement = null;

        switch (method) {
          case "splice":
            addElement = args.slice(2);
            break;

          case "push":
          case "unshift":
            addElement = args;
            break;
        }

        addElement && this.__ob__.observeArray(addElement);

        this.__ob__.dep.notify();
      };
    });

    let id$1 = 0;
    class Dep {
      constructor() {
        this.id = id$1++;
        this.watchers = [];
      }

      depend() {
        Dep.target.addDep(this);
      } // addSub方法,改一下名好辨识


      addWatcher(watcher) {
        this.watchers.push(watcher);
      }

      notify() {
        this.watchers.forEach(watcher => watcher.update());
      }

    }
    Dep.target = null;

    function observe(data) {
      if (!isObject(data)) return;
      if (data.__ob__) return;
      return new Observer(data);
    }

    class Observer {
      constructor(data) {
        // 添加dep保存在__ob__下,方便对象和数组调用而已。
        // 数组原本没存dep(对比上一条git),而对象是原本就有(现在加多一个__ob__.dep能添加属性的时候用)
        this.dep = new Dep();
        Object.defineProperty(data, "__ob__", {
          value: this,
          enumerable: false
        });

        if (isArray$1(data)) {
          data.__proto__ = arrayMethods;
          this.observeArray(data);
        } else {
          this.walk(data);
        }
      }

      walk(data) {
        Object.keys(data).forEach(key => {
          definedReactive(data, key, data[key]);
        });
      }

      observeArray(arr) {
        arr.forEach(observe);
      }

    }
    /**
     * 性能问题1: 对象嵌套太多会影响性能
     * @param data
     * @param key
     * @param value
     * @returns {*}
     */


    function definedReactive(data, key, value) {
      let dep = new Dep();
      let innerOb = observe(value);
      Object.defineProperty(data, key, {
        get() {
          if (Dep.target) {
            dep.depend();

            if (innerOb) {
              innerOb.dep.depend();

              if (isArray$1(value)) {
                dependArray(value);
              }
            }
          }

          return value;
        },

        set(newValue) {
          if (newValue === value) return;

          if (isObject(newValue)) {
            observe(newValue);
          }

          value = newValue;
          dep.notify();
        }

      });
    }
    /**
     * 边界问题处理:
     * 问题: 页面使用{{arr}};  data:{ arr = [[]] }; 进行修改arr[0].push(100)发现没触发更新
     * 解答: 这时只对arr最外层数组的__ob__.dep搜集了watcher, arr[0]没有搜集watcher,
     *       所以要递归给内部的也加上外部的watcher
     */


    function dependArray(arr) {
      for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        current.__ob__ && current.__ob__.dep.depend(); // 依赖收集

        if (isArray$1(current)) {
          dependArray(current);
        }
      }
    }

    function initState(vm) {
      const opts = vm.$options;

      if (opts.data) {
        initData(vm);
      }
    }

    function initData(vm) {
      let data = vm.$options.data;
      data = vm._data = isFunction(data) ? data() : data;
      observe(data);

      for (let key in data) {
        proxy(vm, key, "_data");
      }
    }
    /**
     * 易混淆: 这里是将“options的data”代理到实例 和 new Vue(options)的options没任何关联, options的任何属性都不会挂载到实例
     * @param vm
     * @param key
     * @param source
     * @returns {*}
     */


    function proxy(vm, key, source) {
      Object.defineProperty(vm, key, {
        get() {
          return vm[source][key];
        },

        set(v) {
          vm[source][key] = v;
        }

      });
    }

    // 用"html".match(new RegExp(ncname))匹配
    const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名，子模块aaa-bbb

    /*[
        0: "aa-bb"
        groups: undefined
        index: 1
        input: "<aa-bb>2131</aa-bb>"
        length: 1
    ]*/

    const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 命名空间标签，aa:aa-xxx。很少用

    /*[
        0: "aa-bb"
        1: "aa-bb"
        groups: undefined
        index: 1
        input: "<aa-bb>2131</aa-bb>>"
        length: 2
    ]*/

    const startTagOpen = new RegExp(`^<${qnameCapture}`); // <标签名和标签名，0: <aa:aa-xxx或<aa-aa, 1: aa:aa-xxx或aa-aa

    /*[
        0: "<aa-bb"
        1: "aa-bb"
        groups: undefined
        index: 0
        input: "<aa-bb>2131</aa-bb>"
        length: 2
    ]*/

    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性

    /*{
        0: "title = 123"    // 完整字符串
        1: "title"      // key
        2: "="          // 等号
        3: undefined    // 双引号
        4: undefined    // 单引号
        5: "123"        // 无引号
        groups: undefined
        index: 0
        input: "title = 123></aa-bb>"
        length: 6
    }*/

    const startTagClose = /^\s*(\/?)>/; // 标签结束, >或/>

    /*{
        0: "/>"
        1: "/"
        groups: undefined
        index: 0
        input: "/>32323"
        length: 2
    }*/
    // const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // // 文本, {{message}}

    /*{
        0: "{{message}}"
        length: 1
    }*/

    const endTagReg = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 标签结束 0: </aa-bb>, 1: aa-bb

    /*{
        0: "</aa-bb>"
        1: "aa-bb"
        groups: undefined
        index: 0
        input: "</aa-bb>"
        length: 2
    }*/

    function parserHTML(html) {
      let root = null;
      let stack = []; // 利用入栈/出栈来 对应 开始标签/结束标签, 来完善root

      while (html) {
        let idx = html.indexOf("<"); // 开始标签/结束标签

        if (idx === 0) {
          let startTag = parseStartTag();

          if (startTag) {
            start(startTag);
            continue;
          }

          let endTag;

          if (endTag = html.match(endTagReg)) {
            end(endTag[1]);
            advance(endTag[0].length);
          }
        } // 内容


        if (idx > 0) {
          let content = html.substring(0, idx);
          text(content);
          advance(content.length);
        }
      }

      function advance(len) {
        html = html.substring(len);
      }

      function parseStartTag() {
        let match = html.match(startTagOpen);

        if (!match) {
          return false;
        }

        advance(match[0].length);
        let result = {
          tagName: match[1],
          attrs: []
        };
        let end, attr;

        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          result.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (end) {
          advance(end[0].length);
        }

        return result;
      }

      function start({
        tagName,
        attrs
      }) {
        let parent = stack[stack.length - 1];
        let element = createASTElement(tagName, attrs, parent);

        if (parent) {
          parent.children.push(element);
        }

        if (root === null) {
          root = element;
        }

        stack.push(element);
      }

      function end(tagName) {
        if (stack.pop().tag !== tagName) {
          console.log(`闭合标签和开始标签不匹配`);
        }
      }

      function text(content) {
        let parent = stack[stack.length - 1];
        content = content.replace(/\s/g, '');

        if (content) {
          parent.children.push({
            text: content,
            type: 2
          });
        }
      }

      function createASTElement(tag, attrs, parent) {
        return {
          tag,
          attrs,
          parent,
          type: 1,
          children: []
        };
      }

      return root;
    }

    let defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配文本, {{message}}

    /*{
        0: "{{message}}"
        length: 1
    }*/

    function astGenerateCode(ast) {
      let children = genChildren(ast);
      let code = `_c("${ast.tag}",
            ${ast.attrs.length ? genProps(ast.attrs) : undefined},
            ${children ? `${children}` : ""}
        )`;
      return code;
    }

    function genProps(attr) {
      let result = "";
      attr.forEach(item => {
        if (item.name === 'style') {
          let styles = {};
          item.value.replace(/([^;:]+):([^;:]+)/g, (...args) => {
            styles[args[1]] = args[2].trim();
          });
          item.value = styles;
        }

        result += `${item.name}:${JSON.stringify(item.value)},`;
      });
      return `{${result.slice(0, -1)}}`;
    }

    function genChildren(ast) {
      let children = ast.children;

      if (children) {
        return children.map(gen).join(",");
      }

      return false;
    }

    function gen(subAst) {
      if (subAst.type === 1) {
        return astGenerateCode(subAst);
      } else {
        let text = subAst.text;
        if (!defaultTagRE.test(text)) return `_v(${text})`;
        defaultTagRE.lastIndex = 0;
        let result = [];
        let low = 0;
        let match;

        while (match = defaultTagRE.exec(text)) {
          let fast = match.index;

          if (fast > low) {
            result.push(JSON.stringify(text.slice(low, fast)));
          }

          result.push(`_s(${match[1].trim()})`);
          low = fast + match[0].length;
        }

        if (low < text.length) {
          result.push(JSON.stringify(text.slice(low)));
        }

        return `_v(${result.join('+')})`;
      }
    }

    function compilerToFunction(html) {
      let ast = parserHTML(html);
      let code = astGenerateCode(ast);
      let render = new Function(`with(this) { return ${code} }`);
      return render;
    }

    function createVnodeEle(vm, tag, data = {}, ...children) {
      return vnode(vm, tag, data, children, data.key, undefined);
    }
    function createVnodeText(vm, text) {
      return vnode(vm, undefined, undefined, undefined, undefined, text);
    }

    function vnode(vm, tag, data = {}, children, key, text) {
      return {
        vm,
        tag,
        data,
        children,
        key,
        text
      };
    }

    function isSameNode(oldVnode, newVnode) {
      return oldVnode.tag === newVnode.tag && oldVnode.key == newVnode.key;
    }

    /**
     * vnode => real dom
     */
    function patch(oldVnode, newVnode) {
      if (oldVnode.nodeType) {
        let parentNode = oldVnode.parentNode;
        let realDom = createElm(newVnode);
        parentNode.insertBefore(realDom, oldVnode.nextSibing);
        parentNode.removeChild(oldVnode);
        return realDom;
      } else {
        // 对比不同
        if (!isSameNode(oldVnode, newVnode)) {
          oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
        } // 对比相同


        let el = newVnode.el = oldVnode.el;

        if (!oldVnode.tag) {
          if (oldVnode.text !== newVnode.text) {
            return el.textContent = newVnode.text;
          }
        }

        createElmProp(newVnode, oldVnode.data);
      }
    }
    function createElm(vnode) {
      let {
        vm,
        tag,
        data,
        children,
        text
      } = vnode;

      if (tag) {
        // 在vnode.el都存了真实dom
        vnode.el = document.createElement(tag);
        createElmProp(vnode, data);
        children.forEach(child => {
          vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function createElmProp(newVnode, oldProps = {}) {
      let el = newVnode.el;
      let newProps = newVnode.data || {};
      let newStyle = newProps.style || {};
      let oldStyle = oldProps.style || {};

      for (let key in oldStyle) {
        if (!newStyle[key]) {
          el.style[key] = "";
        }
      }

      for (let key in newProps) {
        if (key === 'style') {
          for (let s in newStyle) {
            el.style[s] = newStyle[s];
          }
        } else {
          el.setAttribute(key, newProps[key]);
        }
      }

      for (let key in oldProps) {
        if (!newProps[key]) {
          el.removeAttribute(key);
        }
      }
    }

    let queue$1 = [];
    let free$1 = true;
    function nextTick(fn) {
      queue$1.push(fn);

      if (free$1) {
        Promise.resolve().then(flushSchedulerQueue$1);
        free$1 = false;
      }
    }

    function flushSchedulerQueue$1() {
      queue$1.forEach(fn => fn());
      queue$1 = [];
      free$1 = true;
    }

    let ids = new Set();
    let queue = [];
    let free = true;
    /**
     * 和防抖有些不同,
     * 这里是把render放到微任务,等同步代码执行完, 然后就会执行render
     */

    function queueWatcher(watcher) {
      let id = watcher.id;

      if (!ids.has(id)) {
        ids.add(id);
        queue.push(watcher);
      }

      if (free) {
        nextTick(flushSchedulerQueue);
        free = false;
      }
    }

    function flushSchedulerQueue() {
      queue.forEach(watcher => watcher.run());
      ids.clear();
      queue = [];
      free = true;
    }

    let id = 0;
    class Watcher {
      constructor(vm, updateCpmponent, cb) {
        this.id = id++;
        this.vm = vm;
        this.getter = updateCpmponent;
        this.cb = cb;
        this.depIds = new Set();
        this.deps = [];
        this.get();
      }

      get() {
        Dep.target = this;
        this.getter();
        Dep.target = null;
      }

      addDep(dep) {
        let depId = dep.id;

        if (!this.depIds.has(depId)) {
          this.depIds.add(depId);
          this.deps.push(dep);
          dep.addWatcher(this);
        }
      }

      update() {
        // 快速修改多次值会导致render多次
        // this.get()
        queueWatcher(this);
      }

      run() {
        this.get(); // FIXME: 会再出发一次依赖收集, 有优化空间?
      }

    }

    /**
     * 将全局属性都放到对应队列里，方便初始化子组件时进行属性合并
     * @param Vue
     */

    function initGlobalAPI(Vue) {
      Vue.options = {};

      Vue.mixin = function (options) {
        this.options = mergeOptions$1(this.options, options);
      };

      Vue.component = function () {};

      Vue.filter = function () {};

      Vue.directive = function () {};
    }
    /**
     * 类似Object.assign,将全局属性组合起来
     * @param parentVal
     * @param childVal
     * @returns {{}}
     */

    function mergeOptions$1(parentVal, childVal) {
      const options = {};

      for (let key in parentVal) {
        mergeFiled(key);
      }

      for (let key in childVal) {
        if (!parentVal.hasOwnProperty(key)) {
          mergeFiled(key);
        }
      }

      function mergeFiled(key) {
        let strategy = strategys$1[key];

        if (strategy) {
          options[key] = strategy(parentVal[key], childVal[key]);
        } else {
          options[key] = childVal[key] || parentVal[key];
        }
      }

      return options;
    }
    /**
     * 生命周期函数(使用队列存储)
     * @type {{}}
     */

    let strategys$1 = {};
    let lifeCycle$1 = ["beforeCreate", "created", "beforeMount", "mounted"];
    lifeCycle$1.forEach(hook => {
      strategys$1[hook] = function (parentVal, childVal) {
        if (childVal) {
          if (parentVal) {
            return parentVal.concat(childVal);
          } else {
            if (isArray$1(childVal)) {
              return childVal;
            }

            return isArray$1(childVal) ? childVal : [childVal];
          }
        } else {
          return parentVal;
        }
      };
    });
    /**
     * 暴露声明周期函数
     * @param vm
     * @param hook
     */

    function callHook(vm, hook) {
      let handlers = vm.$options[hook];
      handlers && handlers.forEach(item => {
        item.call(this); // 声明周期的this永远指向实例
      });
    }

    function mountComponent(vm) {
      let updateCpmponent = function () {
        let vNode = vm._render();

        vm._update(vNode);
      };

      callHook(vm, 'beforeCreate');
      new Watcher(vm, updateCpmponent, () => {// FIXME: 依赖收集完成并进行了初次渲染
      });
      callHook(vm, 'mounted');
    }
    function lifCycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
      };
    }

    function isArray(val) {
      return Array.isArray(val);
    }
    // 第二次合并:  {beforeCreate: [fn]} {beforeCreate: fn} => {beforeCreate: [fn, fn]}


    let strategys = {}; // 存储所有策略

    let lifeCycle = ["beforeCreate", "created", "beforeMount", "Mounted"];
    lifeCycle.forEach(hook => {
      strategys[hook] = function (parentVal, childVal) {
        if (childVal) {
          if (parentVal) {
            return parentVal.concat(childVal); // 看上面的第二次合并，parentVal已经是数组
          } else {
            if (isArray(childVal)) {
              return childVal;
            }

            return [childVal];
          }
        } else {
          return parentVal;
        }
      };
    });
    function mergeOptions(parentVal, childVal) {
      const options = {}; // 合并全局属性和组件属性(options)

      for (let key in parentVal) {
        mergeFiled(key);
      } // 添加组件属性


      for (let key in childVal) {
        if (!parentVal.hasOwnProperty(key)) {
          mergeFiled(key);
        }
      }

      function mergeFiled(key) {
        let strat = strategys[key];

        if (strat) {
          options[key] = strat(parentVal[key], childVal[key]); // 合并生命周期
        } else {
          options[key] = childVal[key] || parentVal[key]; // 合并data那些
        }
      }

      return options;
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        let vm = this; // vm.$options = options
        // 合并:全局属性+组件属性(如Vue.mixin内的数据和方法)

        vm.$options = mergeOptions(vm.constructor.options, options);
        initState(vm);

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };

      Vue.prototype.$mount = function (el) {
        let vm = this;
        vm.$el = document.querySelector(el);
        let opts = vm.$options;

        if (!opts.render) {
          let html = opts.template || vm.$el.outerHTML;
          opts.render = compilerToFunction(html);
        }

        mountComponent(vm);
      };

      Vue.prototype.$nextTick = nextTick;
    }

    function renderMixin(Vue) {
      /**
       * render => vnode
       */
      Vue.prototype._render = function () {
        let vm = this;
        let {
          render
        } = vm.$options;
        let vnode = render.call(vm);
        return vnode;
      };

      Vue.prototype._c = function () {
        let vm = this;
        return createVnodeEle(vm, ...arguments);
      };

      Vue.prototype._v = function (text) {
        let vm = this;
        return createVnodeText(vm, text);
      };

      Vue.prototype._s = function (data) {
        if (isObject(data)) return JSON.stringify(data);
        return data;
      };
    }

    function Vue(options) {
      this._init(options);
    } // 扩展原型


    initMixin(Vue);
    renderMixin(Vue);
    lifCycleMixin(Vue);
    initGlobalAPI(Vue);
    let vm = new Vue({
      data() {
        return {
          name: "lang"
        };
      }

    });
    let render = compilerToFunction(`<div style="color: yellowgreen;font-size: 20px">{{name}}</div>`);
    let oldVnode = render.call(vm);
    let el = createElm(oldVnode); // 真实节点

    document.body.appendChild(el);
    vm.name = 'lang02';
    let render2 = compilerToFunction(`<div style="color: lightskyblue">{{name}}</div>`);
    let newVnode = render2.call(vm);
    setTimeout(() => {
      patch(oldVnode, newVnode); // let el2 = createEle(newVnode);
      // document.body.removeChild(el1);
      // document.body.appendChild(el2);
      // 以上是还没做diff的
    }, 2000);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
