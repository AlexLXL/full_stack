<template>
    <div>
        <header>09.快照测试 [动态组件]</header>
        <div v-if="type == 'A'">AAAAA组件</div>
        <div v-if="type == 'B'">BBBBB组件</div>
    </div>
</template>

<script>
    export default {
        name: "SnapshotTest",
        props: {
            type: {
                type: String,
                default: "A"
            }
        },
        data: function () {
            return {}
        },
        mounted() {}
    }
</script>

<style scoped>

</style>
