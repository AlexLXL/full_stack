/**
 * 基于Browser(history)
 * @returns {{goBack: *, go: *, action: string, location: {}, push: *, listen: *}}
 */
function createBrowserHistory() {
    let globalHistory = window.history
    let listeners = [] // 存放所有监听函数
    let message

    function go(n) {
        globalHistory.go(n)
    }

    // 后退
    function goBack() {
        globalHistory.go(-1)
        console.log(globalHistory)
        console.log(window.location.pathname)
    }

    // 前进
    function goForward() {
        globalHistory.go(1)
    }

    // 监听
    function listen(listener) {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
        // 返回一个卸载监听函数
    }

    // push函数
    function push(pathname, state) {
        let action = 'PUSH'
        if (typeof pathname === 'object') {
            state = pathname.state
            pathname = pathname.pathname
        }
        if (message) {
            let comfirmMessage = message({pathname})
            let allow = window.confirm(comfirmMessage)
            if (!allow) return
        }
        // 核心原理
        globalHistory.pushState(state, null, pathname)
        let location = {pathname, state}
        notify({
            action,
            location
        });
    }

    // 路由传参合并到history对象, route接受的props就会更新值
    function notify(newState) {
        Object.assign(history, newState)
        history.length = globalHistory.length
        // 执行监听函数
        listeners.forEach(listener => listener(history.location))
    }

    window.addEventListener('popstate', (event) => {
        notify({
            action: event.type,
            location: window.location
        })
    });

    function block(newMessage) {
        message = newMessage;
        return () => message = null;
    }

    let history = {
        action: 'POP',
        go,
        goBack,
        goForward,
        push,
        listen,
        location: {
            pathname: window.location.pathname,
            state: window.location.state
        },
        block
    }
    return history
}

export default createBrowserHistory