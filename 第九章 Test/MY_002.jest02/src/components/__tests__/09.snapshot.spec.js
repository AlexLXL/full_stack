import snapshot from "../09snapshotTest";
import snapshotDynamic from "../09snapshotTestDynamic";
import { shallowMount } from "@vue/test-utils";

describe("09snapshotTest", () => {
    test("No.001 测试创建快照(静态页面)", () => {
        const wrapper = shallowMount(snapshot);
        expect(wrapper.element).toMatchSnapshot();
        // npm run test:unit, 第1次是创建快照, 第2次开始是对比快照
        // npm run test:unit -- --updateSnapshot, 更新所有快照
        // npm run test:unit -- --u, 更新所有快照
        // npm run test:unit -- --w, 交互方式更新快照, 按<u>更新失败的快照
    })

    test("No.002 测试创建快照(动态页面)(props使用类型A)", () => {
        // 将动态页面(props、data、date.now等)转换为可确定的静态页面
        const wrapper = shallowMount(snapshotDynamic, {
            propsData: {
                type: "A"
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    })

    test("No.003 测试创建快照(动态页面)(props使用类型B)", () => {
        // 将动态页面(props、data、date.now等)转换为可确定的静态页面
        const wrapper = shallowMount(snapshotDynamic, {
            propsData: {
                type: "B"
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    })
})