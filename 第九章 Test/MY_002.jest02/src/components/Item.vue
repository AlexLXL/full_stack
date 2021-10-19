<template>
    <div class="ItemVue" style="width: 100%;height: 100%;background-color: skyblue">
        <p>{{ name }}</p>
        <p>{{ hobby }}</p>
        <p>{{ (certificate || {}).sn }}</p>
        <a :href="url">{{ url }}</a>
        <span class="subTitle smallTitle miniTitle">小标题</span>
    </div>
</template>

<script>
    export default {
        name: "Item",
        data: function () {
            return {
                name: "alexLXL",
                hobby: "oopp",
            }
        },
        props: {
            certificate: Object,
            url: String,
        }
    }
</script>

<style scoped>
    a {
        color: #42b983;
    }
</style>
