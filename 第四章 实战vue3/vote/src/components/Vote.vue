<template>
    <div ref="root">
        <h1>{{title}}</h1>
        <p>支持人数: {{state.supNum}}</p>
        <p>反对人数: {{state.oppNum}}</p>
        <!--<p>支持率: {{cSupRatio}}</p>-->
        <p>支持率: {{ratio}}</p>
        <button @click="count(1)">支持</button>
        <button @click="count(0)">反对</button>

        <button @click="addOne">x++</button>
    </div>
</template>

<script>
    import {watchEffect, watch, ref, reactive, toRefs, computed, onBeforeMounted} from 'vue'

    export default {
        name: "Vote",
        props: {
            title: String
        },
        // 载初始化props和beforeCreated之间创建
        setup(props) {
            // 1.watchEffect: 监控属性变化,会立即执行一次。当内部代理数据发生改变,会触发函数再执行
            // watchEffect(() => {
            //     // 这里只能使用代理数据
            //     console.log(props.title)    // 可以
            //     console.log(props)  // 不可以(单独这行)
            //     // 同理,如果setup把参数解构也是不行的
            // }

            // 2.ref: 构建响应式数据, (基于definedProperty) (返回一个对象, 通过.value访问值)
            // let supNum = ref(0)
            // let oppNum = ref(0) // 默认是普通数据,不加ref的话
            // function count(isAdd) {
            //     isAdd ? supNum.value++ : oppNum.value++
            // }
            // return { supNum, oppNum, count}

            // 3.reactive: 构建响应式数据, (基于Proxy) (加属性也会更新★)
            let state = reactive({
                supNum: 0,
                oppNum: 0
            })

            // state.oppNum = 0
            function count(isAdd) {
                isAdd ? state.supNum++ : state.oppNum++
            }

            // 5.计算属性
            // let cSupRatio = computed(() => {
            //     let total = (state.supNum + state.oppNum) || 1
            //     let supRate = ((state.supNum / total) * 100).toFixed(2) + "%"
            //     return supRate
            // })

            // 6 watch: 等效vue2的$watch
            // 6.1 监听对象
            watch(state, () => {
                console.log("监听到state改变")
            })
            // 6.1 监听具体属性
            watch(
                () => state.supNum,
                () => {
                    console.log("监听到state.supNum改变")
                }
            )
            // 6.2 多监听
            let x = ref(0)
            let y = ref(0)
            watch([x, y], () => {
                console.log(`修改了x、y`)
            })

            function addOne() {
                x.value++
            }

            let ratio = ref("--")
            watch(state, state => {
                let total = (state.supNum + state.oppNum) || 1
                ratio.value = ((state.supNum / total) * 100).toFixed(2) + "%"
            })

            // 7 refs
            // 暴露出去然后绑定到html
            let rootRef = ref(null)
            // console.log(root.value)

            // 8 声明周期
            // 写setup里面的加on,写外面的不用加
            onBeforeMounted(async () => {
                console.log(`挂在前请求数据`)
            })

            // 9 过滤器直接改成函数方式暴露
            const filterDate = (time) => return `xxxx`


            return {
                state,
                count,
                // cSupRatio,
                addOne,
                ratio,
                rootRef,
                filterDate
                // ...toRefs(state) // 4.toRefs: 转ref
            }   // return 的值会挂在this上，setup是没this的，外面的声明周期才有this
        },

        beforeMount() {

        }
    }
</script>

<style scoped>

</style>