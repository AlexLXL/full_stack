import { shallowMount } from "@vue/test-utils";
import TestEvent from "../04Event";

describe("04Event.vue", () => {
    test("No.001 测试原生事件", async () => {
        let handleClick2 = jest.fn();
        const wrapper = shallowMount(TestEvent, {
            propsData: {
                handleClick2
            }
        });
        await wrapper.find(".btn").trigger("click");
        expect(wrapper.text()).toContain("clicked");

        wrapper.find(".btn2").trigger("click");
        expect(handleClick2).toHaveBeenCalled();
    });

    // test("No.002 测试自定义事件", async () => {
    //     const wrapper = shallowMount(TestEvent, {
    //         propsData: {
    //             handleClick2: jest.fn()
    //         }
    //     });
    //     wrapper.find(".btn3").trigger("click");
    //     expect(wrapper.emitted("eat")).toHaveLength(2);
    // });

    test("No.004 测试输入框", async () => {
        const wrapper = shallowMount(TestEvent);
        let inputEl = wrapper.find('input[type="text"]');
        inputEl.setValue("Edd");
        inputEl.trigger("change");
        // console.log(wrapper.vm.message); // "Edd"

        // 发请求的时候参数是动态的，所以用expect.objectContaining检测是否有特定写死的参数即可
        // const axios = { post: jest.fn() };
        // const wrapper = shallowMount(TestEvent, mocks: { axios } );
        // let url = "/smtp";
        // let data = expect.objectContaining({email: "8888@tom.com"});
        // expect(axios.post).toHaveBeenCalledWith(url, data);
    });

    test("No.005 测试单选框", async () => {
        const wrapper = shallowMount(TestEvent);
        let raidoEl = wrapper.find('#dewey');
        raidoEl.setChecked(true);
    });

    test("No.006 jsdom的局限性", async () => {
        /*
        * 在Node运行Vue单元测试，你需要使用jsdom模拟DOM环境，多数情况是有效的，但有时会遇到未实现特性问题
        * 1.布局
        * 2.导航(导航到其它页面), 通过端到端测试实现
        * */
    });
});

