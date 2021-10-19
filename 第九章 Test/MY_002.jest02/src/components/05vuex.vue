<template>
    <div>
        <h3>测试Vuex</h3>
        <h3>computed: {{ getName }}</h3>
        <h3>mapState: {{ count }}</h3>
        <h3>mapState: {{ userInfo }}</h3>
        <h3>mapGetters: {{ getAge }}</h3>
    </div>
</template>

<script>
    import { mapState, mapGetters } from "vuex";

    export default {
        name: "TestVuex",
        data: function () {
            return {
                name: "hello vuex"
            }
        },
        computed: {
            getName() {
                return this.name;
            },
            ...mapState(["count"]),
            ...mapGetters(["getAge"]),
            ...mapState({
                userInfo: (state) => state.user.userInfo || "null"
            })
        },
        mounted() {
            console.log(this.$store.state.count); // 0
            this.$store.commit("increment");
            this.$store.dispatch("increment");
            console.log(this.$store.state.count); // 1
            
            console.log(this.$store.state.user);
        }
    }
</script>

<style scoped>

</style>
