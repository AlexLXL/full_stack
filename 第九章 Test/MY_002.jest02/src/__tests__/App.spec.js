import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import TestEvent from "../components/04Event";
import App from "../App";

describe("04Event.vue", () => {
    test("No.003 测试自定义事件之父组件监听函数", async () => {
        const wrapper = shallowMount(App, {
            stubs: ['router-link', 'router-view']
        });
        await wrapper.findComponent(TestEvent).vm.$emit("eat");
        expect(wrapper.findComponent(TestEvent).exists()).toBeFalsy();
        // exists(): 组件是否存在
        // toBeFalsy(): 等于false
    });
});

