import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";
import user from "./modules/user";

Vue.use(Vuex);

var store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules: {
        user
    }

    // actions: {
    //     increment (context) {
    //         // context等效于store
    //         // 因此可在内部组合actions、mutations、state的操作
    //         context.commit('increment')
    //     }
    // },

    // 可理解为vuex的方法 (this.$store.commit("xxxx")调用) // 必须是同步函数
    // mutations: {
    //     increment(state) {
    //         state.count++;
    //     }
    // },

    // 可理解为vuex的data (mapState添加到注册属性)
    // state: {
    //     count: 10,
    //     age: 20
    // },

    // 可理解为vuex的计算属性 (this.$store.getters.xxxx调用) (mapGetters添加到注册属性)
    // getters: {
    //     getAge(state) {
    //         return state.age + 100;
    //     }
    // }
})

export default store;