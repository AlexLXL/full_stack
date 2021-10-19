import { fetchData } from "../api/api.js"

export default {
    increment (context) {
        // context等效于store
        // 因此可在内部组合actions、mutations、state的操作
        context.commit('increment');
        context.commit('increment');
        context.commit('increment');
    },
    getData(context) {
        fetchData().then(() => {
            context.commit('increment');
        })
    }
}