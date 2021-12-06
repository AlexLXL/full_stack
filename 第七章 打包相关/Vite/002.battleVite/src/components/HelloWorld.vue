<template>
    <h1>{{ msg }}</h1>
    <p class="less">less</p>
    <p class="sass">sass</p>
    <div class="postcss"></div>
</template>
<script scoped>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
    }
</script>
<style scoped lang="less">
    @color: red;
    .less {
        color: @color;
    }
</style>
<style scoped lang="scss">
    $color: yellow;
    .sass {
        color: $color;
    }
</style>
<style scoped>
    .postcss {
        width: 100px;
        height: 300px;
        background-color: pink;
        transform: rotate(45deg);
    }
</style>