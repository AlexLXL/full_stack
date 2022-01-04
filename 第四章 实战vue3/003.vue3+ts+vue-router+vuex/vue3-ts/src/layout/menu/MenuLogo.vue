<template>
  <div class="logo">
    <img :src="'./public/favicon.ico'" alt="">
    <span>Vue3+TypeScript实战</span>
  </div>
</template>
<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .logo {
    height: 50px;
    line-height: 50px;
    color: #fff;
    padding-left: 1px;
    border: none;
    background-color: #2b2f3a;
    display: flex;
    align-items: center;

    .img {
      width: 32px;
      height: 32px;
      marg-right: 12px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      vertical-align: middle;
      line-height: 50px;
    }
  }
</style>