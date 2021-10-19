(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function isFunction(val) {
      return typeof val === "function";
    }
    function isObject(val) {
      return typeof val === "object" && val !== null;
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    let callbacks = [];
    let waiting = false;
    function nextTick(fn) {
      callbacks.push(fn);

      if (!waiting) {
        Promise.resolve().then(flushCallbacks);
        waiting = true;
      }
    }

    function flushCallbacks() {
      callbacks.forEach(fn => fn());
      callbacks = [];
      waiting = false;
    } // 第一次合并： {} {beforeCreate: fn} => {beforeCreate: [fn]}
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

    let oldArrayPrototype = Array.prototype;
    let arrayMethods = Object.create(oldArrayPrototype);
    let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];
    methods.forEach(method => {
      arrayMethods[method] = function (...args) {
        oldArrayPrototype[method].call(this, ...args); // 监控新增的值

        let inserted = null;
        let ob = this.__ob__;

        switch (method) {
          case "splice":
            inserted = args.slice(2);

          case "push":
          case "unshift":
            inserted = args;
            break;
        }

        if (inserted) ob.observeArray(inserted);
        ob.dep.notify(); // 响应式原理之收集依赖之更新流程
      };
    });

    let id$1 = 0;
    class Dep {
      constructor() {
        this.subs = [];
        this.id = id$1++;
      }

      depend() {
        Dep.target.addDep(this); // watcher添加dep
      }

      addSub(watcher) {
        this.subs.push(watcher);
      }

      notify() {
        this.subs.forEach(watcher => watcher.update());
      }

    }
    Dep.target = null;

    function observe(value) {
      if (value.__ob__) return;
      if (!isObject(value)) return;
      return new Observer(value);
    }

    class Observer {
      constructor(value) {
        // 给对象添加dep(给数组添加值，给对象添加属性时调用该dep)
        this.dep = new Dep(); // 1.标识值已经监控过
        // 2.方便array.js里调用监控数组的方法
        // 3.方便数组内的引用数据调用__ob__.dep更新页面

        Object.defineProperty(value, "__ob__", {
          value: this,
          enumerable: false
        });

        if (isArray(value)) {
          value.__proto__ = arrayMethods;
          this.observeArray(value);
        } else {
          this.walk(value);
        }
      }

      walk(data) {
        // 监控对象
        Object.keys(data).forEach(key => {
          defineReactive(data, key, data[key]);
        });
      }

      observeArray(data) {
        // 监控数组
        data.forEach(item => observe(item)); // 数组内的引用类型添加监控，[[], {}]
      }

    }

    function defineReactive(obj, key, value) {
      let childObj = observe(value); // 递归监控value

      let dep = new Dep(); // // 给对象属性添加dep

      Object.defineProperty(obj, key, {
        get() {
          if (Dep.target) {
            dep.depend();

            if (childObj) {
              childObj.dep.depend();

              if (isArray(value)) {
                dependArray(value);
              }
            }
          }

          return value;
        },

        set(newValue) {
          if (newValue === value) return;
          observe(newValue); // 新值加监控

          value = newValue;
          dep.notify();
        }

      });
    }

    function dependArray(value) {
      // 数组里的 引用类型 都收集依赖(更新watcher)
      for (let i = 0; i < value.length; i++) {
        let current = value[i];
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
      data = vm._data = isFunction(data) ? data.call(vm) : data;
      observe(data);

      for (let key in data) {
        proxy(vm, key, "_data");
      }

      console.log("添加监控后data:", data); // data.arr.push(3);
      // console.log(vm.arr);
      // vm.arr[1].push(3);
      // vm.name = {a: 2};
      // vm.name.a = 20;
      // vm.arr.push({a: 100});
      // vm.arr[3].a = 200;
    }

    function proxy(vm, key, source) {
      Object.defineProperty(vm, key, {
        get() {
          return vm[source][key];
        },

        set(newValue) {
          vm[source][key] = newValue;
        }

      });
    }

    // 用"html".match(new RegExp(ncname))匹配
    const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 匹配标签名，子模块aaa-bbb

    /*[
        0: "aa-bb"
        groups: undefined
        index: 1
        input: "<aa-bb>2131</aa-bb>>"
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

    const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配<标签名和标签名，0: <aa:aa-xxx或<aa-aa, 1: aa:aa-xxx或aa-aa

    /*[
        0: "<aa-bb"
        1: "aa-bb"
        groups: undefined
        index: 0
        input: "<aa-bb>2131</aa-bb>"
        length: 2
    ]*/

    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性, 见下

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

    const startTagClose = /^\s*(\/?)>/; // 匹配标签结束, >或/>

    /*{
        0: "/>"
        1: "/"
        groups: undefined
        index: 0
        input: "/>32323"
        length: 2
    }*/
    // const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // // 匹配文本, {{message}}

    /*{
        0: "{{message}}"
        length: 1
    }*/

    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结束 0: </aa-bb>, 1: aa-bb

    /*{
        0: "</aa-bb>"
        1: "aa-bb"
        groups: undefined
        index: 0
        input: "</aa-bb>"
        length: 2
    }*/
    // 生成ast树

    function parserHTML(html) {
      let stack = [];
      let root = null;

      function start(tagName, attrs) {
        let parent = stack[stack.length - 1];
        let element = createASTElement(tagName, attrs, parent);

        if (root === null) {
          root = element;
        }

        if (parent) {
          element.parent = parent;
          parent.children.push(element);
        }

        stack.push(element);
      }

      function text(chars) {
        let parent = stack[stack.length - 1];
        chars.replace(/\s/g, ""); // 替换空格

        if (chars) {
          parent.children.push({
            type: 2,
            text: chars
          });
        }
      }

      function end(tagName) {
        let endTag = stack.pop();

        if (endTag.tag != tagName) {
          console.log("标签出错");
        }
      }

      function advance(len) {
        html = html.substring(len);
      }

      function parseStartTag() {
        const start = html.match(startTagOpen);

        if (start) {
          // 匹配到开始标签
          const match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length); // 匹配属性

          let end, attr;

          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            // 顺序不能反
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }

          if (end) {
            advance(end[0].length);
          }

          return match;
          /*
          {
              tagName: div,
              attrs: [
                  {title: 123}
              ]
          }
          */
        }

        return false;
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

      while (html) {
        let index = html.indexOf("<");

        if (index === 0) {
          // 开始标签
          const startTagMatch = parseStartTag(); // 拿到开始标签的名称和属性，开始构建ast

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          } // 结束标签


          let endTagMatch;

          if (endTagMatch = html.match(endTag)) {
            end(endTagMatch[1]);
            advance(endTagMatch[0].length);
            continue;
          }

          break;
        } // 文本


        if (index > 0) {
          let chars = html.substring(0, index);
          text(chars);
          advance(chars.length);
        }
      }

      return root;
    }

    let defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配文本, {{message}}

    /*{
        0: "{{message}}"
        length: 1
    }*/

    function generate(ast) {
      // 2.处理子组件
      let children = genChildren(ast); // 1.处理第一层div

      let code = `_c("${ast.tag}",
            ${ast.attrs.length ? genProps(ast.attrs) : "undefined"}
            ${children ? `,${children}` : ""}
        )`;
      return code;
    }

    function genChildren(el) {
      let children = el.children;

      if (children) {
        // 要分类讨论，1.普通文本 2.{{文本}} 3.子标签span/div
        return children.map(item => gen(item)).join(",");
      }

      return false;
    }

    function gen(el) {
      if (el.type == 1) {
        // 3.子标签span/div
        return generate(el);
      } else {
        // 1.只有普通文本
        let text = el.text;
        if (!defaultTagRE.test(text)) return `_v("${text}")`;
        defaultTagRE.lastIndex = 0; // ★ /g正则调用test()和exec()lastIndex都会往后
        //  2.普通文本 + {{文本}}

        let lastIndex = 0;
        let tokens = [];
        let match;

        while (match = defaultTagRE.exec(text)) {
          // ★ exec和正则的/g要注意，/g会让 defaultTagRE的lastIndex 往后一位
          // 如<p>aa {{bb}} cc {{dd}}</p>
          // 第一次是匹配到aa {{bb}}
          let index = match.index;

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push(`_s(${match[1].trim()})`); // 1 -- name

          lastIndex = index + match[0].length; // 0 -- {{name}}
        }

        if (lastIndex < text.length) {
          // 匹配最后的普通文本bb， aa {{name}} bb
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return `_v(${tokens.join(" + ")})`;
      }
    }
    /**
     * 生成属性字符串
     * @param attrs
     * @returns {string} 返回 {id:"app",style:{"font-size":"18px","color":"#ccc"}}
     */


    function genProps(attrs) {
      let str = "";

      for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];

        if (attr.name === "style") {
          let styles = {};
          attr.value.replace(/([^;:]+):([^;:]+)/g, function (...args) {
            styles[args[1].trim()] = args[2].trim();
          });
          attr.value = styles;
        }

        str += `${attr.name}:${JSON.stringify(attr.value)},`;
      }

      return `{${str.slice(0, -1)}}`;
    }
    /*
    * replace方法返回的arcgument
    * {
    *   0: "color:123"
    *   1: "color"
    *   2: "123"
    *   3: 0
    *   4: "color:123;color:123"
    *   length: 5
    * }
    *
    * */

    function compilerToFunction(template) {
      console.log("template:", template);
      let ast = parserHTML(template);
      console.log("ast:", ast);
      let code = generate(ast);
      console.log("code:", code);
      let render = new Function(`with(this) {return ${code}}`);
      console.log("render:", render.toString());
      return render;
    }
    /*
    示例:AST格式

    {
    parent: undefined
    tag: "div"
    type: 1
    attrs: Array(2)
        0: {name: "id", value: "app"}
        1: {name: "style", value: "font-size: 18px; color: #ccc"}
        length: 2
        __proto__: Array(0)
    children: Array(2)
        0: {type: 2, text: " aa {{name}} bb "}
        1: {tag: "span", attrs: Array(0), parent: {…}, type: 1, children: Array(1)}
        length: 2
        __proto__: Array(0)
    }
    */

    function patch(oldVnode, vnode) {
      const parentNode = oldVnode.parentNode;
      const elm = createElm(vnode);
      parentNode.insertBefore(elm, oldVnode.nextSibing);
      parentNode.removeChild(oldVnode);
      return elm;
    }

    function createElm(vnode) {
      let {
        tag,
        data,
        children,
        text,
        vm
      } = vnode;

      if (typeof tag === "string") {
        vnode.el = document.createElement(tag);
        updateProperties(vnode.el, data);
        children.forEach(child => {
          vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function updateProperties(el, props = {}) {
      // 边界问题: 样式
      for (let key in props) {
        el.setAttribute(key, props[key]);
      }
    }

    let has = {};
    let queue = [];
    let pending = false;
    function queueWatcher(watcher) {
      let id = watcher.id;

      if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);
      }

      if (!pending) {
        nextTick(flushSchedulerQueue); // 修改值的也是放到微任务队列里

        pending = true;
      }
    }

    function flushSchedulerQueue() {
      queue.forEach(watcher => watcher.run());
      queue = [];
      has = {};
      pending = false;
    }

    let id = 0;
    class Watcher {
      constructor(vm, fn, cb, options) {
        this.vm = vm;
        this.fm = fn;
        this.cb = cb;
        this.options = options; // 是否渲染watcher

        this.id = id++;
        this.depIds = new Set();
        this.deps = [];
        this.getter = fn;
        this.get();
      }

      get() {
        // 初始化
        Dep.target = this; // window.target = watcher

        this.getter();
        Dep.target = null;
      }

      run() {
        // 真正更新
        // console.log("run执行次数");
        this.get();
      }

      update() {
        // 更新
        // this.get();
        queueWatcher(this); // 缓存更新，调度watcher
      }

      addDep(dep) {
        let did = dep.id;

        if (!this.depIds.has(did)) {
          // 这里实现dep.ids的去重和watcher.deps去重
          this.depIds.add(did);
          this.deps.push(dep); // 保存id并让watcher记住dep

          dep.addSub(this);
        }
      }

    }

    function mountComponent(vm) {
      // let vnode = vm._render();
      // console.log("vnode:", vnode);
      // vm._update(vnode);
      // 组件更新函数
      let updateComponent = () => {
        vm._update(vm._render()); // render -> vnode -> real DOM

      };

      callHook(vm, "beforeCreate");
      new Watcher(vm, updateComponent, () => {
        // render -> getter -> watcher
        callHook(vm, "created");
      }, true);
      callHook(vm, "mounted");
    }
    function lifCycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
      };
    }
    function callHook(vm, hook) {
      let handlers = vm.$options[hook];
      handlers && handlers.forEach(item => {
        item.call(this); // 声明周期的this永远指向实例
      });
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        const vm = this; // vm.$options = options;

        vm.$options = mergeOptions(vm.constructor.options, options); // 全局属性和组件属性合并

        initState(vm);

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };

      Vue.prototype.$mount = function (el) {
        const vm = this;
        const opts = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;

        if (!opts.render) {
          let template = opts.template;

          if (!opts.template) {
            template = el.outerHTML;
          }

          let render = compilerToFunction(template);
          opts.render = render;
        }

        mountComponent(vm);
      };

      Vue.prototype.$nextTick = nextTick;
    }
    /*
    示例:render函数

    function render() {
      with(this) {
        return _c('div', {
          attrs: {
            "id": "app"
          }
        }, [_v("aa " + _s(msg) + " cc "), _c('p', [_v("cc")])])
      }
    }
    */

    function createElement(vm, tag, data = {}, ...children) {
      return vnode(vm, tag, data, children, data.key, undefined);
    }
    function createText(vm, text) {
      return vnode(vm, undefined, undefined, undefined, undefined, text);
    }

    function vnode(vm, tag, data, children, key, text) {
      // key用于之后做diff
      return {
        vm,
        tag,
        data,
        children,
        key,
        text
      };
    }

    function renderMixin(Vue) {
      Vue.prototype._render = function () {
        const vm = this;
        let {
          render
        } = vm.$options;
        let vnode = render.call(vm);
        return vnode;
      };

      Vue.prototype._c = function () {
        const vm = this;
        return createElement(vm, ...arguments);
      };

      Vue.prototype._v = function (text) {
        // 创建文本的虚拟节点
        const vm = this;
        return createText(vm, text);
      };

      Vue.prototype._s = function (val) {
        if (isObject(val)) return JSON.stringify(val);
        return val;
      };
    }

    // 合并 全局属性 到组件
    function initGlobalAPI(Vue) {
      Vue.options = {}; // 全局属性(组件初始化时，添加这些属性)

      Vue.mixin = function (options) {
        this.options = mergeOptions(this.options, options);
        return this;
      };

      Vue.component = function (options) {};

      Vue.filter = function (options) {};

      Vue.directive = function (options) {};
    }

    function Vue(option) {
      this._init(option);
    } // vue内部的扩展方法


    initMixin(Vue);
    renderMixin(Vue);
    lifCycleMixin(Vue); // vue外部扩展方法(给用户使用)

    initGlobalAPI(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
