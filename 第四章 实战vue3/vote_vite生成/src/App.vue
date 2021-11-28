<template>
    <img alt="Vue logo" src="./assets/logo.png"/>
    <Vote :title="title"></Vote>
</template>

<script>
    import Vote from './components/Vote.vue'

    export default {
        name: 'App',
        data: function () {
            return {
                title: "投票标题A"
            }
        },
        mounted() {
            setTimeout(() => {
                this.title = "投票标题B"
            },1000)
        },
        components: {
            Vote
        }
    }
</script>
