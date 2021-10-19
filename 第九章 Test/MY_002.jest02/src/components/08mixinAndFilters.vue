<template>
    <div>
        <header>08.测试混合和过滤</header>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    import { titleMixin } from "./08titleMixin"

    export default {
        name: "Test_mixin_and_filters",
        mixins: [ titleMixin ],
        data: function () {
            return {
                title: "oop"
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
