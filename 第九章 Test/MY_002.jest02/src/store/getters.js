export default {
    getAge(state) {
        return state.age + 100;
    },
    instockProducts(state) {
        return state.products.filter(p => p.stock > 0);
    }
}