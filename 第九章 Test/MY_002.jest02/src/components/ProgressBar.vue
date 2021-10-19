<template>
    <div>
        <span>======= ProgressBar =========</span>
        <p>{{countdown}}</p>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        data: function () {
            return {
                countdown: 200
            }
        },
        methods: {
            start() {
                console.log("ProgressBar_start");
            }
        },
        mounted() {
            setInterval(() => {
                --this.countdown
            }, 1000)
        }
    }
</script>

<style scoped>

</style>
