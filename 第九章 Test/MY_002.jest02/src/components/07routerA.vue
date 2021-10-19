<template>
    <div>
        <header class="componentRouterA"
                @mouseenter="mouseHandle"
                @mouseleave="mouseHandle"
                @mousemove="mouseHandle">07.routerA</header>
    </div>
</template>

<script>
    import { debounce } from "src/utils/decorator.js"
    // import { throttle } from "src/utils/decorator.js"
    export default {
        name: "TestRouterA",
        data: function () {
            return {}
        },
        methods: {
            @debounce(1000)
            mouseHandle() {
                console.log("被点击")
            }
        },
        mounted() {}
    }
</script>

<style scoped>
    .componentRouterA {
        width: 100%;
        height: 100px;
        background-color: skyblue;
    }
</style>
