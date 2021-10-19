import RouterC from "../07routerC";
import RouterD from "../07routerD";
import RouterE from "../07routerE";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

describe("07routerA~E.js", () => {
    test("No.001 测试$route属性", () => {
        // 想要$route和$router里的值可控，使用mock
        // 单纯需要引入$route和$router两个变量，可以使用localVue.use(VueRouter)
        const wrapper = shallowMount(RouterC, {
            mocks: {
                $route: {
                    params: {
                        id: 456
                    }
                }
            },
        });
        expect(wrapper.text()).toContain("456");
    })

    test("No.002 测试$router属性", () => {
        let mocks = {
            $route: {
                params: {
                    type: "top",
                    page: "12"
                }
            },
            $router: {
                replace: jest.fn()
            }
        }
        const wrapper = shallowMount(RouterD, {
            mocks
        });
        // expect(mocks.$router.replace).toHaveBeenCalledWith("/RouterD/new/mountedJump");
    })

    test("No.003 测试RouterLinkStub", () => {
        const wrapper = shallowMount(RouterE, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/RouterE");
        expect(wrapper.findComponent(RouterLinkStub).text()).toContain("跳转RouterE");
    })
})