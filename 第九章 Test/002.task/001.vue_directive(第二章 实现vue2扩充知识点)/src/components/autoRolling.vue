<template>
    <div class="autoRolling">
        <div class="containerOne">
            <p class="content" v-auto-rolling="'10'">
                关于这个事，我简单说两句，你明白就行，总而言之这个事呢，现在就是这个情况，具体的呢，大家也都看得到，也得出来说那么几句，可能你听的不是很明白，但是意思就是那么个意思，不知道的你也不用去猜，这种事情见得多了，我只想说懂得都懂，不懂的我也不多解释，毕竟自己知道就好，细细品吧。
            </p>
        </div>

        <div class="containerTwo">
            <p class="content" v-auto-scroll="'50'">
                关于这个事，我简单说两句，你明白就行，总而言之这个事呢，现在就是这个情况，具体的呢，大家也都看得到，也得出来说那么几句，可能你听的不是很明白，但是意思就是那么个意思，不知道的你也不用去猜，这种事情见得多了，我只想说懂得都懂，不懂的我也不多解释，毕竟自己知道就好，细细品吧。
            </p>
        </div>

        <div class="containerTwo">
            <p class="content" v-auto-scroll-two="true">
                关于这个事，我简单说两句，你明白就行，总而言之这个事呢，现在就是这个情况，具体的呢，大家也都看得到，也得出来说那么几句，可能你听的不是很明白，但是意思就是那么个意思，不知道的你也不用去猜，这种事情见得多了，我只想说懂得都懂，不懂的我也不多解释，毕竟自己知道就好，细细品吧。
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'autoRolling',
        data: function () {
            return {}
        },
        methods: {},
        directives: {
            "autoRolling": {
                bind(el, binding, vnode) {
                    el.style.animation = `rolling ${binding.value}s linear infinite`
                    el.handleMouseEnter = () => { 
                        el.style['animation-play-state'] = 'paused'
                    }
                    el.handleMouseLeave = () => { 
                        el.style['animation-play-state'] = 'running'
                    }
                    el.addEventListener("mouseenter", el.handleMouseEnter)
                    el.addEventListener("mouseleave", el.handleMouseLeave)
                }
            },
            "autoScroll": {
                bind(el, binding, vnode) {
                    let start = () => {
                        el.autoScrollTimer = setInterval(() => {
                            let parent = el.parentNode
                            if(parent.scrollTop >= (parent.scrollHeight - parent.offsetHeight)) {
                                parent.scrollTop = 0
                            } else {
                                parent.scrollTop++
                            }
                        }, binding.value);
                    }
                    start()
                    el.handleMouseEnter = () => {
                        clearInterval(el.autoScrollTimer)
                    }
                    el.handleMouseLeave = start
                    el.addEventListener("mouseenter", el.handleMouseEnter)
                    el.addEventListener("mouseleave", el.handleMouseLeave)
                }
            },
            "autoScrollTwo": {
                bind(el, binding, vnode) {
                    let noop = () => {
                        el.autoScrollTimer = window.requestAnimationFrame( start );
                    }
                    let start = () => {
                        let parent = el.parentNode
                        if(parent.scrollTop >= (parent.scrollHeight - parent.offsetHeight)) {
                            parent.scrollTop = 0
                        } else {
                            parent.scrollTop++
                        }
                        el.autoScrollTimer = window.requestAnimationFrame( noop );
                    }
                    el.autoScrollTimer = window.requestAnimationFrame( start );
                    el.handleMouseEnter = () => {
                        window.cancelAnimationFrame(el.autoScrollTimer)
                    }
                    el.handleMouseLeave = () => {
                        el.autoScrollTimer = window.requestAnimationFrame( start );
                    }
                    el.addEventListener("mouseenter", el.handleMouseEnter)
                    el.addEventListener("mouseleave", el.handleMouseLeave)
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .autoRolling {
        display: flex;

        .containerOne {
            width: 100px;
            height: 200px;
            margin: 0 10px 0 0;
            overflow: hidden;
        }

        .containerTwo {
            width: 100px;
            height: 200px;
            margin: 0 10px 0 0;
            overflow: auto;
        }

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background-color: transparent;
        }

        ::-webkit-scrollbar-track {
            background-color: #E6ECF1;
            border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background-color: #C0DBF3;
        }

        ::-webkit-scrollbar-button {
            display: none;
        }

        ::-webkit-scrollbar-corner {
            border-radius: 3px;
            background-color: transparent;
        }

        ::-webkit-scrollbar-thumb:vertical:hover,::-webkit-scrollbar-thumb:horizontal:hover {
            background-color: #808080;
        }
    }
</style>
