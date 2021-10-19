// import RouterA from "../components/07routerA";
// import RouterB from "../components/07routerB";
// import RouterC from "../components/07routerC";
const RouterA = () => import('../components/07routerA');
const RouterB = () => import('../components/07routerB');
const RouterC = () => import('../components/07routerC');
const RouterD = () => import('../components/07routerD');

export default [
    {
        path: '/RouterA',
        component: RouterA
    },
    {
        path: '/RouterB',
        component: RouterB
    },
    {
        path: '/RouterC/:id',
        component: RouterC
    },
    {
        path: '/RouterD/:type(top|new)',
        component: RouterD
    },
    {
        path: '/RouterD/:type(top|new)/:page?',
        component: RouterD
    },
    {
        path: '/',
        redirect: '/index'
    }
];