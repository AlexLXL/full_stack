<template>
  <el-main :style="{ height: mainHeight + 'px' }">
    <div style="display: flex;">
      <el-card style="flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
<!--        <div ref="orderTotalChart" :style="{ width: '400px', height: '300px' }"></div>-->
        <CommonEcharts :options="orderTotalOption" :height="'30vh'"></CommonEcharts>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>用户统计</span>
          </div>
        </template>
<!--        <div ref="userTotalChart" :style="{ width: '400px', height: '300px' }"></div>-->
        <CommonEcharts :options="userTotalOption" :height="'30vh'"></CommonEcharts>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>售后统计</span>
          </div>
        </template>
<!--        <div ref="afterSaleTotalChart" :style="{ width: '400px', height: '300px' }"></div>-->
        <CommonEcharts :options="afterSaleTotalOption" :height="'30vh'"></CommonEcharts>
      </el-card>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import {ref, nextTick, onMounted, reactive, onBeforeUnmount} from 'vue'
// import useInstance from '@/hooks/useInstance';
import {orderTotalOption, userTotalOption, afterSaleTotalOption} from "./echartDataNode";
import CommonEcharts from '@/components/CommonEcharts.vue'

// const {global} = useInstance()
const mainHeight = ref(0)
// const orderTotalChart = ref<HTMLElement>();
// const userTotalChart = ref<HTMLElement>();
// const afterSaleTotalChart = ref<HTMLElement>();

//柱状图
const loadOrderTotalChart = () => {
  // const instance = global.$$echarts.init(orderTotalChart.value);
  orderTotalOption.setSeriesData([120, 200, 150, 80, 70, 110, 130])
  // instance.setOption(orderTotalOption)
  setTimeout(() => {
    orderTotalOption.setSeriesData([11, 33, 135, 40, 170, 10, 140])
  }, 2000)
}
//饼图
const loadUserTotalChart = () => {
  // const instance = global.$$echarts.init(userTotalChart.value);
  userTotalOption.setSeriesData([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}])
  // instance.setOption(userTotalOption)
}
//环图
const loadAfterSaleTotalChart = () => {
  // const instance = global.$$echarts.init(afterSaleTotalChart.value);
  afterSaleTotalOption.setSeriesData([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}
  ])
  // instance.setOption(afterSaleTotalOption)
}

onMounted(() => {
  loadOrderTotalChart();
  loadUserTotalChart();
  loadAfterSaleTotalChart();
  nextTick(() => {
    mainHeight.value = window.innerHeight - 100
  })
})
</script>
<style scoped lang='scss'>
</style>