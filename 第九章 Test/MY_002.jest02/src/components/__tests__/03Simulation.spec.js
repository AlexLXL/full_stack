jest.mock("../../api/api.js");
import { shallowMount } from "@vue/test-utils";
import Simulation from "../03Simulation";
import * as api  from "../../api/api";
import flushPromises from "flush-promises"

describe("03Simulation.vue", () => {
    test("No.001 模拟代码替换vm实例方法 + 检测Vue原型上方法调用情况", () => {
        const $bar =  {
            start: jest.fn() // 方式一: 创建jest mock函数 (实例上的this.$bar会变成调用jest mock)
        }
        api.fetchData.mockResolvedValueOnce({ a: "a", b: "b" }) // 挂载前mock fetchData方法
        const wrapper = shallowMount(Simulation, {
            mocks: {
                $bar
            }
        });
        expect($bar.start).toHaveBeenCalledTimes(1);
    });


    test("No.002 模拟代码替换请求函数 + 依赖文件", async () => {
        // jest.spyOn(api, "fetchData");
        // api.fetchData.mockImplementation(() => {
        //     return Promise.resolve({ a: "c", b: "b" })
        // })
        expect.assertions(1); // 通过断言次数等于1
        api.fetchData.mockResolvedValueOnce({ a: "a", b: "b" })
        // let data = await api.fetchData();
        let data;
        api.fetchData().then((res) => {
            data = res;
        })
        await flushPromises();
        expect(data.a).toBe("a");
    });
});

