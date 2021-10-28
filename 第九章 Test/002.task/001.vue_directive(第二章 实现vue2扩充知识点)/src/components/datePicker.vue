<template>
    <div class="datePicker" v-click-outside="handleClickOutSide">
        <input type="text" v-model="remark" @focus="showArea(true)">
        <div class="area" v-show="areaVisible">内容</div>

        <router-link to="/autoRolling">自定义指令: 滚动页面</router-link>
        <router-link to="/lazyLoadImg">自定义插件: 懒加载页面</router-link>
    </div>
</template>

<script>
    export default {
        name: 'datePicker',
        data: function () {
            return {
                remark: "无",
                areaVisible: false,
                autoRolling: true
            }
        },
        methods: {
            showArea(flag) {
                this.areaVisible = flag
            },
            handleClickOutSide() {
                this.areaVisible = false
            }
        },
        directives: {
            "clickOutside": {
                bind(el, binding, vnode) {
                    el.handle = (e) => {
                        if (!el.contains(e.target)) {
                            vnode.context[binding.expression](e)
                        }
                    }
                    document.addEventListener('click', el.handle)
                },
                unbind(el, binding, vnode) {
                    document.removeEventListener('click', el.handle)
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .datePicker {
        display: inline-block;

        .area {
            width: 100px;
            height: 100px;
            background-color: skyblue;
        }
    }
</style>
