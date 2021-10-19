<template>
    <div class="componentChild">
        <button @click="handleClick" class="childVisibleBtn">显示/隐藏</button>
        <button @click="changeText" class="childTextBtn">修改文本</button>
        <p v-show="visible"
           class="childText"
           :style="{'fontSize': size + 'px'}"
        >{{text}}</p>
    </div>
</template>

<script>
    export default {
        name: "Child",
        data: function () {
            return {
                visible: false,
                size: 18,
                timer: "",
                text: "初始文本"
            }
        },
        methods: {
            handleClick() {
                this.visible = !this.visible;
                this.size = (this.size === 18) ? 12 : 18;
            },
            closeAfterOneSecond() {
                setTimeout(() => {
                    this.visible = !this.visible;
                }, 1000)
            },
            startInterval() {
                this.timer = setInterval(() => {
                    console.log("setInterval");
                }, 100)
            },
            finishInterval() {
                clearInterval(this.timer);
            },
            changeText() {
                this.text = Date.now()
            }
        }
    }
</script>

<style scoped>
    a {
        color: #42b983;
    }
</style>
