<template>
    <div id="app">
        <div v-if="false">
            <Item :certificate="certificate" url="www.baidu.com"/><hr>
            <Child></Child><hr>
            <Simulation></Simulation><hr>
            <TestEvent v-if="visible" @eat="eat" :handleClick2="handleClick2"></TestEvent><hr>
            <TestVuex></TestVuex><hr>
        </div>


        <router-link :to="{path: '/RouterA'}" class="routerABtn">To RouterA | </router-link>
        <router-link :to="{path: '/RouterB'}" >To RouterB | </router-link>
        <router-link :to="{path: '/RouterC/123'}" >To RouterC | </router-link>
        <router-view></router-view><hr>

        <div v-if="false">
            <RouterE></RouterE><hr>
            <MixinAndFilters></MixinAndFilters><hr>
            <SnapshotTest></SnapshotTest><hr>
            <SnapshotTestDynamic></SnapshotTestDynamic><hr>
            <ETE></ETE><hr>
        </div>
    </div>
</template>

<script>
    import Item from './components/Item.vue'
    import Child from './components/Child.vue'
    import Simulation from './components/03Simulation.vue'
    import TestEvent from './components/04Event.vue'
    import TestVuex from './components/05vuex.vue'
    import RouterE from './components/07routerE.vue'
    import MixinAndFilters from './components/08mixinAndFilters.vue'
    import SnapshotTest from './components/09snapshotTest.vue'
    import SnapshotTestDynamic from './components/09snapshotTestDynamic.vue'
    import ETE from './components/10e2e.vue'

    export default {
        name: 'App',
        data: function () {
            return {
                certificate: { sn: "IJ7878" },
                visible: true
            }
        },
        methods: {
            eat() {
                // console.log("父组件接收事件");
                this.visible = false;
            },
            handleClick2() {}
        },
        components: {
            Item,
            Child,
            Simulation,
            TestEvent,
            TestVuex,
            RouterE,
            MixinAndFilters,
            SnapshotTest,
            SnapshotTestDynamic,
            ETE
        },
        mounted() {
            // this.$router.push({ path: "/index" });
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
