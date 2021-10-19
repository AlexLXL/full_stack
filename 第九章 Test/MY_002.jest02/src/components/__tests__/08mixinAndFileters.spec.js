import { shallowMount } from "@vue/test-utils";
import mixinAndFilters from "../08mixinAndFilters";
import { uppercase } from "../08textFilters"

describe("08mixinAndFilters.js", () => {
    test("No.001 测试mixin", async () => {
        // jest.spyOn(console, "log");
        const wrapper = await shallowMount(mixinAndFilters);
        const titleEl = wrapper.find(".title");
        expect(titleEl.text()).toBe("titlemixin");
        // expect(console.log).toHaveBeenCalledWith("1111");
    })

    test("No.002 测试filters文件", async () => {
        expect(uppercase("LAnG")).toBe("lang");
    })

    test("No.003 测试组件中的filters", async () => {
        // 和上面001的类似, 不重复写了
    })
})