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
                render(vnode, container)
                app._container = container
            }
        }
        return app
    }
}