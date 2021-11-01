let vue_lazyload = {
    install(Vue, options) {
        let lazyClass = lazy(Vue)
        let instance = new lazyClass(options)
        Vue.directive('lazy', {
            bind: instance.add.bind(instance),  // class的方法单独拿出来会获取不到this,所以需要绑定this
            unbind: instance.unbind.bind(instance)
        })
    }
}

function lazy(Vue) {
    class lazyClass {
        constructor(options) {
            this.options = options
            this.hasListener = false
            this.queue = []
            this.parent = null
        }
        add(el, binding, vnode) {
            let img = new ReactiveListener(el, binding.value, this.options)
            this.queue.push(img)
            Vue.nextTick(() => {
                if (!this.hasListener) {
                    this.parent = getScrollParent(el)
                    this.hasListener = true
                    this.parent.addEventListener('scroll', this.lazyLoadHandler.bind(this), {
                        passive: true
                    })
                    this.lazyLoadHandler()
                }
            })
        }
        lazyLoadHandler() {
            this.queue.forEach(img => {
                if (img.state.hasLoad) return
                img.check(this.parent) && img.load()
            })
        }
        unbind(el, binding, vnode) {}
    }

    class ReactiveListener {
        constructor(el, src, options) {
            this.el = el
            this.src = src
            this.options = options
            this.state = { hasLoad: false }
        }
        check(parent) {
            let {top} = this.el.getBoundingClientRect()
            return top < (parent.offsetHeight * this.options.preLoad)
        }
        load() {
            render(this, 'loading') // 添加占位图
            loadImg(this.src).then(() => {
                this.state.hasLoad = true
                render(this, 'loaded')
            }).catch(() => {
                this.state.hasLoad = true
                render(this, 'error')
            })
        }
    }

    function render(img, status) {
        let el = img.el
        switch (status) {
            case 'loading':
                el.src = img.options.loading
                break;
            case 'loaded':
                el.src = img.src
                break;
            case 'error':
                el.src = img.options.error
                break;
        }
    }
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.src = src
            img.onload = resolve
            img.onerror = reject
        })
    }

    return lazyClass
}

function getScrollParent(el) {
    let parent = el.parentNode
    while(parent) {
        if (/(scroll)|(auto)/.test(getComputedStyle(parent).overflow)) {
            return parent
        }
        parent = parent.parentNode
    }
}

export default vue_lazyload