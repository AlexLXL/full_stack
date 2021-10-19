<template>
    <div>
        <h3>{{ title }}</h3>
        <p class="btn" @click="handleClick">handleClick</p>
        <p class="btn2" @click="handleClick2">handleClick2</p>
        <p class="btn3" @click="handleClick3">handleClick3</p>
        <input type="text" v-model="message">

        <div>
            <input type="radio" id="huey" name="drone" value="huey" checked>
            <label for="huey">Huey</label>
        </div>
        <div>
            <input type="radio" id="dewey" name="drone" value="dewey">
            <label for="dewey">Dewey</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TestEvent",
        data: function () {
            return {
                title: "04.TestEvent",
                message: "text文本"
            }
        },
        props: {
            handleClick2: {
                type: Function,
                default: () => {}
            },
        },
        methods: {
            handleClick() {
                this.title = "04.clicked";
            },
            handleClick3() {
                // console.log("子组件发射事件");
                this.$emit("eat")
                this.$emit("eat")
            }
        },
        mounted() {}
    }
</script>

<style scoped>

</style>
