<template>
    <div>
        <header>09.快照测试 [静态组件]</header>
        <p>获取代码的快照，并将其与以前保存的快照进行对比 (jest是通过对比序列化值)</p>
        <transition>
            <svg class="spinner" width="50px" height="50px" viewBox="0 0 50 50">
                <circle class="path" fill="none" stroke-width="4" stroke-linecap="round"
                cx="22" cy="22" r="20"></circle>
            </svg>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SnapshotTest",
        data: function () {
            return {}
        },
        mounted() {}
    }
</script>

<style scoped>

</style>
