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
    function isArray(val) {
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

        if (isArray(data)) {
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

              if (isArray(value)) {
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

        if (isArray(current)) {
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
        if (!defaultTagRE.test(text)) return `_v("${text}")`;
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
      if (!isReservedTag(tag)) {
        let Ctor = vm.$options.components[tag];
        return createComponent(vm, tag, data = {}, children, data.key, Ctor);
      }

      return vnode(vm, tag, data, children, data.key, undefined);
    }
    function createVnodeText(vm, text) {
      return vnode(vm, undefined, undefined, undefined, undefined, text);
    }

    function vnode(vm, tag, data = {}, children, key, text, componentOptions) {
      return {
        vm,
        tag,
        data,
        children,
        key,
        text,
        componentOptions
      };
    }

    function isSameNode(oldVnode, newVnode) {
      return oldVnode.tag === newVnode.tag && oldVnode.key == newVnode.key;
    }
    const isReservedTag = makeMap('template,script,style,element,content,slot,link,meta,svg,view,' + 'button,a,div,img,image,text,span,input,switch,textarea,spinner,select,' + 'slider,slider-neighbor,indicator,canvas,' + 'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' + 'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown');

    function makeMap(str) {
      let tagList = str.split(',');
      return function (tagName) {
        return tagList.includes(tagName);
      };
    }
    /**
     * @param vm
     * @param tag
     * @param data
     * @param children
     * @param Ctor 构造函数
     */


    function createComponent(vm, tag, data = {}, children, key, Ctor) {
      if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor);
      } // 组件的初始化、更新、插入、销毁


      data.hook = {
        init(vnode) {
          let component = vnode.componentInstance = new Ctor({}); // 返回Vue子类实例,会触发组件的_init(),进行数据劫持

          component.$mount(); // 由于没有el,手动挂载一下,进行render和update
        },

        prepatch() {},

        insert() {},

        destroy() {}

      };
      let vNode = vnode(vm, tag, data, undefined, key, undefined, {
        Ctor,
        children,
        tag
      });
      return vNode;
    }

    /**
     * vnode => real dom
     */
    /**
     * 节点比对, 递归的方式, 有差异就替换
     * 属性比对
     * @param oldVnode
     * @param newVnode
     * @returns {*}
     */

    function patch(oldVnode, newVnode) {
      if (!oldVnode) {
        return createElm(newVnode);
      }

      if (oldVnode.nodeType) {
        let parentNode = oldVnode.parentNode;
        let realDom = createElm(newVnode);
        parentNode.insertBefore(realDom, oldVnode.nextSibing);
        parentNode.removeChild(oldVnode);
        return realDom;
      } else {
        // 节点不同
        if (!isSameNode(oldVnode, newVnode)) {
          return oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
        } // 节点相同


        let el = newVnode.el = oldVnode.el;

        if (!oldVnode.tag) {
          if (oldVnode.text !== newVnode.text) {
            return el.textContent = newVnode.text;
          }
        }

        createElmProp(newVnode, oldVnode.data);
        let oldChildren = oldVnode.children || []; // 比较儿子

        let newChildren = newVnode.children || [];

        if (oldChildren.length && !newChildren.length) {
          el.innerHTML = '';
        } else if (!oldChildren.length && newChildren.length) {
          newChildren.forEach(child => el.appendChild(createElm(child)));
        } else {
          updateChildren(el, oldChildren, newChildren);
        }

        return el;
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
        if (createComponentElm(vnode)) {
          return vnode.componentInstance.$el;
        } // 在vnode.el都存了真实dom


        vnode.el = document.createElement(tag);
        createElmProp(vnode, data);
        children.forEach(child => {
          vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    } // 是否组件Vnode

    function createComponentElm(vnode) {
      let i = vnode.data;

      if ((i = i.hook) && (i = i.init)) {
        i(vnode);
      }

      if (vnode.componentInstance) {
        return true;
      }
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

    function updateChildren(el, oldChildren, newChildren) {
      let oldStartIndex = 0;
      let oldStartVnode = oldChildren[0];
      let oldEndIndex = oldChildren.length - 1;
      let oldEndVnode = oldChildren[oldEndIndex];
      let newStartIndex = 0;
      let newStartVnode = newChildren[0];
      let newEndIndex = newChildren.length - 1;
      let newEndVnode = newChildren[newEndIndex];
      let mapping = makeKeyByIndex(oldChildren); // 头头、尾尾、头尾、尾头、乱序

      while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) {
          oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) {
          oldEndVnode = oldChildren[--oldEndIndex];
        } else if (isSameNode(oldStartVnode, newStartVnode)) {
          patch(oldStartVnode, newStartVnode);
          oldStartVnode = oldChildren[++oldStartIndex];
          newStartVnode = newChildren[++newStartIndex];
        } else if (isSameNode(oldEndVnode, newEndVnode)) {
          patch(oldEndVnode, newEndVnode);
          oldEndVnode = oldChildren[--oldEndIndex];
          newEndVnode = newChildren[--newEndIndex];
        } else if (isSameNode(oldStartVnode, newEndVnode)) {
          patch(oldStartVnode, newEndVnode);
          el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
          oldStartVnode = oldChildren[++oldStartIndex];
          newEndVnode = oldChildren[--newEndIndex];
        } else if (isSameNode(oldEndVnode, newStartVnode)) {
          patch(oldEndVnode, newStartVnode);
          el.insertBefore(oldEndVnode.el, newStartVnode.el);
          oldEndVnode = oldChildren[--oldEndIndex];
          newStartVnode = newChildren[++newStartIndex];
        } else {
          let moveIndex = mapping[newStartVnode.key];

          if (moveIndex === undefined) {
            el.insertBefore(createElm(newStartVnode), oldStartVnode.el);
          } else {
            let moveVnode = oldChildren[moveIndex];
            patch(moveVnode, newStartVnode);
            el.insertBefore(moveVnode.el, oldStartVnode.el);
            oldChildren[moveIndex] = undefined;
          }

          newStartVnode = newChildren[++newStartIndex];
        }
      }

      if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
          let anchor = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null;
          el.insertBefore(createElm(newChildren[i]), anchor);
        }
      }

      if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          let child = oldChildren[i];
          child && el.removeChild(child.el);
        }
      }
    }

    function makeKeyByIndex(children) {
      let map = {};
      children.forEach((item, index) => {
        map[item.key] = index;
      });
      return map;
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
     * 全局属性都存到Vue.options
     * 1.全局生命周期-保存到队列中，然后放到Vue.options.mounted = [fn, fn]
     * 2.全局组件-保存到队列中，然后放到Vue.options.components = {Sub, Sub}
     * @param Vue
     */

    function initGlobalAPI(Vue) {
      Vue.options = {};

      Vue.mixin = function (options) {
        this.options = mergeOptions(this.options, options);
      };

      Vue.options.components = {};

      Vue.component = function (id, definition) {
        // FIXME: definition为函数情况未处理
        let name = definition.name || id;
        definition.name = name;

        if (isObject(definition)) {
          definition = Vue.extend(definition); // 内部自动调用Vue.extent(返回Vue的子类)
        }

        Vue.options.components[name] = definition;
      };
      /**
       * 创建一个函数作为Vue的子类(通过修改原型链)
       * 内部存储了options和mixin属性
       * @param opt
       * @returns {Sub} 其实就是一个构造函数
       */


      Vue.extend = function (opt) {
        const Super = this;

        const Sub = function (options) {
          this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype); // 继承

        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, opt);
        Sub.mixin = Vue.mixin;
        return Sub;
      };

      Vue.filter = function () {};

      Vue.directive = function () {};

      Vue.options._base = Vue;
    }
    /*
    Object.create原理
    Object.create = function (parentPrototype) {
        const Fn = function () {}
        Fn.prototype = parentPrototype
        return Fn
    }
    */

    /**
     * 将全局属性组合起来(类似Object.assign)
     * ● 生命周期、Component
     * @param parentVal
     * @param childVal
     * @returns {{}}
     */

    function mergeOptions(parentVal, childVal) {
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
        let strategy = strategys[key];

        if (strategy) {
          options[key] = strategy(parentVal[key], childVal[key]);
        } else {
          options[key] = childVal[key] || parentVal[key];
        }
      }

      return options;
    }
    /**
     * 生命周期合并策略
     * @type {{}}
     */

    let strategys = {};
    let lifeCycle = ["beforeCreate", "created", "beforeMount", "mounted"];
    lifeCycle.forEach(hook => {
      strategys[hook] = function (parentVal, childVal) {
        if (childVal) {
          if (parentVal) {
            return parentVal.concat(childVal);
          } else {
            if (isArray(childVal)) {
              return childVal;
            }

            return isArray(childVal) ? childVal : [childVal];
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
    /**
     * 组件合并策略
     */

    strategys.components = function (parentVal, childVal) {
      // childVal.__proto__ = parentVal
      let res = Object.create(parentVal);

      if (childVal) {
        for (let key in childVal) {
          res[key] = childVal[key];
        }
      }

      return res;
    };

    function mountComponent(vm) {
      let updateCpmponent = function () {
        let vNode = vm._render();

        vm._update(vNode);
      };

      callHook(vm, 'beforeCreate');
      new Watcher(vm, updateCpmponent, () => {// TODO: 添加生命周期
      });
      callHook(vm, 'mounted');
    }
    function lifCycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        const vm = this;
        let prevVnode = vm._prevVode;
        vm._prevVode = vnode;

        if (!prevVnode) {
          vm.$el = patch(vm.$el, vnode);
        } else {
          vm.$el = patch(prevVnode, vnode);
        }
      };
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        let vm = this; // vm.$options = options
        // 合并:全局属性+组件属性

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
    initGlobalAPI(Vue); // let vm = new Vue({

    return Vue;

}));
//# sourceMappingURL=vue.js.map
