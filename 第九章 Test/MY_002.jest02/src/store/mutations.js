export default {
    increment(state) {
        state.count++;
    },
    setItems(state, { items }) {
        state.items = items;
    }
}