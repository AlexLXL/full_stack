<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="handleClick">
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
      handleClick() {
          console.log(`22222`)
          console.log(this.kk.kk)
      }
  }
}
</script>
