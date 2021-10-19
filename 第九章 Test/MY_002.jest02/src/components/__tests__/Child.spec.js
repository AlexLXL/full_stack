import Child from "../Child.vue";
import { shallowMount } from "@vue/test-utils";

describe("Child.vue", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    test("No.001 component methods", async () => {
        const wrapper = shallowMount(Child);
        const p = wrapper.find('p');
        // const button = wrapper.find('button');
        // await button.trigger('click');
        await wrapper.vm.handleClick();
        expect(p.element.style.display).toBe("none")
    });

    test("No.002 beforeEach + 假定时器", async () => {
        const wrapper = shallowMount(Child);
        wrapper.vm.closeAfterOneSecond();
        await jest.runAllTimers();
        const p = wrapper.find('p');
        expect(p.element.style.display).toBe("none")
    });

    test("No.003 spy检测浏览器API调用情况", async () => {
        jest.spyOn(window, 'clearInterval');
        jest.spyOn(window, 'setInterval');
        setInterval.mockReturnValue(123);
        const wrapper = shallowMount(Child);
        wrapper.vm.startInterval();
        wrapper.vm.finishInterval();
        expect(window.clearInterval).toHaveBeenCalledWith(123);
    });
});

