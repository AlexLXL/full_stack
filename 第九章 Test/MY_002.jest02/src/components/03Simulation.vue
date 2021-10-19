<template>
    <div>
        <p>{{ name }}</p>
    </div>
</template>

<script>
    import { fetchData } from "../api/api.js"

    export default {
        name: "Simulation",
        data: function () {
            return {
                name: "alexLXL",
            }
        },
        methods: {
            getData() {
                let p = fetchData();
                p.then((data) => {
                    data
                    // console.log("组件_fetchData:", data);
                })
            }
        },
        beforeMount() {
            this.$bar.start();
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
