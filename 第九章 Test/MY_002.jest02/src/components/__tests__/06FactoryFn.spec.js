import { shallowMount, createLocalVue } from "@vue/test-utils";
import ProgressBar from "../ProgressBar";
import merge from "../../utils/merge";
import Vuex from "Vuex";
import Vue from "Vue";

function createWrapper(overrides) {
    let localVue = createLocalVue();
    const defaultMountingOptions = {
        mocks: {
            start: jest.fn(),
            finish: jest.fn()
        },
        localVue,
        store: createStore(),
        propsData: {}
    }
    return shallowMount(ProgressBar, merge(defaultMountingOptions, overrides))
}

function createStore(overrides) {
    Vue.use(Vuex);
    const defaultStoreConfig = {
        getters: {
            displayItems: jest.fn()
        },
        actions: {
            featListData: jest.fn()
        }
    }
    return new Vuex.Store( merge(defaultStoreConfig, overrides) );
}

describe("06使用工厂函数组织测试", () => {
    // 随着测试套件体积增大，你会发现其中有很多重复的代码
    // 而避免这种情况的方法发之一就是使用工厂函数，创建可配置实例
    test("No.001 ", () => {
        const wrapper = createWrapper(); // 创建可配置的vue实例
        const store = createStore({
            getters: {
                displayItems: () => {}
            }
        }); // 创建可配置的store实例
    });
});

