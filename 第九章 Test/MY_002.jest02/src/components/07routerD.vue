<template>
    <div>
        <header>07.RouterD正则匹配路由</header>
        <p>type: {{$route.params.type}}</p>
        <p>page: {{$route.params.page}}</p>
    </div>
</template>

<script>
    export default {
        name: "TestRouterD",
        data: function () {
            return {}
        },
        mounted() {
            // this.$router.replace("/RouterD/new/mountedJump");
        }
    }
</script>

<style scoped>

</style>
