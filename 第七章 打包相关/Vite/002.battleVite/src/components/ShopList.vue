<template>
    <h1>{{title}}</h1>
    <button @click="handleClick">{{state.count}}</button>
</template>
<script setup lang="ts">
    import {reactive} from 'vue'
    defineProps({
        title: {
            type: String,
            default: ''
        }
    })
    interface State {
        count: number
    }
    let state = reactive<State>({count: 0})
    let handleClick = () => {
        state.count++
    }
</script>
<style scoped lang="scss">

</style>
