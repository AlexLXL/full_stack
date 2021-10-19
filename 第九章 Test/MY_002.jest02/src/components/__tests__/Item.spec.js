import Item from "../Item.vue";
import Vue from "vue";
import { mount, shallowMount } from "@vue/test-utils"; // mount挂载完整子组件 // shallowMount挂载一层子组件

describe("Item.vue", () => {
    test("No.001 feasibility", () => {
        expect(true).toBe(true);
        expect(true).not.toBe(false);
    });

    test("No.002 import Item", () => {
        // console.log(Item);
    })

    test("No.003 native render 0", () => {
        const Ctor = Vue.extend(Item);
        const vm = new Ctor().$mount();
        expect(vm.name).toContain("alex")
        // expect(vm.$el.textContent).toContain("alex");
    })

    test("No.003 test-unit render I", () => {
        const wrapper = mount(Item);
        // expect(wrapper.vm.$el.textContent).toContain("oop");
        expect(wrapper.text()).toContain("oop");
    })

    test("No.004 propsData I", () => {
        const certificate = { sn:"CC90096" };
        const wrapper = shallowMount(Item, {
            propsData: {
                certificate: certificate
            }
        });
        // debugger
        // console.log(wrapper.text());
        expect(wrapper.text()).toContain("oop");
        expect(wrapper.text()).toContain(certificate.sn);
    })

    test("No.004 propsData II", () => {
        const wrapper = shallowMount(Item);
        // expect(!!wrapper.props().certificate).toBe(true); // wrapper.props()返回定义组件时的prop属性
    })

    test("No.005 find I", () => {
        const url = "https://mail.tom.com/";
        const wrapper = shallowMount(Item, {
            propsData: {
                url
            }
        });
        const a = wrapper.find('a');
        expect(a.text()).toBe(url);
        expect(a.attributes().href).toBe(url);
    })

    test("No.006 findAll I", () => {
        const wrapper = shallowMount(Item);
        const p = wrapper.findAll("p");
        expect(p).toHaveLength(3);
    })

    test("No.007 classes I", () => {
        const wrapper = shallowMount(Item);
        // const span = wrapper.find("span");
        // console.log(span.classes());
        expect(wrapper.classes()).toContain("isVisible");
    })

    test("No.008 style I", () => {
        const wrapper = shallowMount(Item);
        expect(wrapper.element.style.backgroundColor).toBe("skyblue");
    })
});

