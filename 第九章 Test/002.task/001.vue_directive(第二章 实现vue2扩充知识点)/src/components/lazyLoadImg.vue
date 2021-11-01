<template>
    <div class="lazyLoadImg">
        <li v-for="item in list" :key="item">
            <img v-lazy="item" alt="">
        </li>
    </div>
</template>

<script>
    import Vue from 'vue'
    // import VueLazyLoad from 'vue-lazyload' // 使用插件vue-lazyload
    import VueLazyLoad from '@/plugin/vue-lazyload.js'
    import loadimage from "@/assets/logo.png"
    Vue.use(VueLazyLoad, {
        preLoad: 1,
        loading: loadimage
    })
    /*
    Vue.use源码
    Vue.use = function (plugin, options) {
        if (typeof plugin === 'function') {
            plugin(this)
        }else {
            plugin.install(this)
        }
    }
    */
    export default {
        name: "lazyLoadImg",
        data() {
            return {
                list: []
            }
        },
        mounted() {
            fetch('http://localhost:9002/api/list')
                .then((response) => response.json())
                .then(json => {this.list = json})
        }
    }
</script>

<style scoped lang="scss">
    .lazyLoadImg {
        width: 400px;
        height: 400px;
        margin: 10px;
        padding: 20px;
        border: 10px solid yellowgreen;
        overflow-y: scroll;


        img {
            width: 100px;
            height: 100px;
        }
    }
</style>