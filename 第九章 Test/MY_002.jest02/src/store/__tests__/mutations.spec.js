jest.mock("../../api/api.js");
import mutations from "../mutations";
import getters from "../getters";
import actions from "../actions";
import flushPromise from "flush-promises";
import { fetchData } from "../../api/api.js"
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "Vuex";
import Item from "../../components/Item.vue";
// import deepClone from "../../utils/deepClone";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("vuex", () => {
    let storeOptions;
    let store;

    // 在每个测试之前重写公共变量
    beforeEach(() => {
        storeOptions = {
            getters: {
                displayItems: jest.fn()
            },
            actions: {
                featListData: jest.fn()
            }
        }
        store = new Vuex.Store(storeOptions);
    })

    test("No.001 test action", async () => {
        const context = {
            commit: jest.fn()
        };
        fetchData.mockResolvedValueOnce({ name: "P·吉尔伯特" });
        actions.getData(context);
        await flushPromise();
        expect(context.commit).toHaveBeenCalledWith("increment");
    })

    test("No.002 test mutations", () => {
        const items = [ { id: 1 }, { id: 2 } ];
        const state = { items: [] };
        mutations.setItems(state, { items });
        expect(state.items).toBe(items);
    })

    test("No.003 test state", () => {

    })

    test("No.004 test getters", () => {
        const products = [ { stock: 1 }, { stock: 0 }, { stock: 2 } ];
        const state = { products };
        const result = getters.instockProducts(state);
        expect(result).toHaveLength(2);
    })

    test("No.005 test Vuex, store", () => {
        // 问题一: 创建store时均用storeConfig, 因为storeConfig是对象引用, 测试间就没有隔离, 会修改同一个值
        // 解决一: 可使用深克隆来解决隔离问题
        // Vue.use(Vuex);
        // const clonedStoreConfig = deepClone(storeConfig);
        // const store = new Vuex.Store(clonedStoreConfig);
        // expect(store.state.count).toBe(0);

        // 问题二: Vue.use(Vuex)会导致测试泄露, 将来的测试会使用被污染的Vue构造函数
        // 解决二: 使用localVue, localVue是保持单元测试隔离和清洁的一种方式
        shallowMount(Item, {
            localVue
        })
    })

    test("No.006 测试组件中的vuex", () => {
        // 如果一个组件只是简单的调用vuex，可以使用mock
        const $store = {
            actions: {
                featListData: jest.fn()
            }
        }
        shallowMount(Item, {
            mocks: {
                $store
            }
        })

        // 通过Vuex和模拟数据创建一个真实的store, :20行
        shallowMount(Item, {
            localVue,
            store
        })
        // 组件....操作....
        // 判断...

    })
})