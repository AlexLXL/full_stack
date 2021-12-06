<template>
    <img src="@/assets/1.jpg"/>
    <img  :src="imgUrl" />
    <div class="bgWrap"></div>
    <HelloWorld msg="Vue3 + Vite测试"/>
    <ShopList msg="uuuu1"/>
</template>

<script setup>
    import imgUrl from '@/assets/2.jpg'
    import HelloWorld from '@/components/HelloWorld.vue'
    import ShopList from '@/components/ShopList.vue'
</script>

<style scoped>
    .bgWrap {
        width: 200px;
        height: 200px;
        background-image: url("@/assets/3.jpg");
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>