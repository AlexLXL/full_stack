<template>
  <h2>{{showCount}}</h2>
  <div>{{count}}</div>
  <button @click="addBtn">+</button>

  <el-row>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
</template>

<script lang="ts">
  import { ref, computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import { key } from '@/store'

  export default defineComponent({
    setup() {
      const store = useStore(key)
      const count = ref(0)
      const showCount = computed(() => {
        return store.getters.getCount
      })
      const addBtn = () => {
        store.commit('setCount', ++count.value)
      }
      return {
        count,
        showCount,
        addBtn
      }
    }
  });
</script>

<style scoped lang="scss">
$color: skyblue;
h2 {
  color: $color;
}
</style>
