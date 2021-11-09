import {createVnode} from "./vnode";

export function createAppAPI(render) {
    return function createApp(rootComponent, props) {
        let app = {
            _component: rootComponent,
            _rootProps: props,
            _container: null,
            use() {},
            mixin() {},
            component() {},
            mount(container) {
                let vnode = createVnode(rootComponent, props)
                console.log(vnode)
                render(container)
                app._container = container
            }
        }
        return app
    }
}