<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
  </div>
</template>
<script>
    export default {
        name: 'About',
        methods: {
            handleClick() {
                throw new Error("抛出错误")
            }
        }
    }
</script>