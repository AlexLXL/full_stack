import * as echarts from 'echarts'

export default function useEcharts(el: HTMLElement) {
  //创建echarts实例
  const echartInstance = echarts.init(el)
  //设置options
  const setOptions = (options: any) => {
    echartInstance.setOption(options)
  }
  //监听窗口变化做自适应
  const resize = () => {
    echartInstance.resize()
  }
  return {
    setOptions,
    resize
  }
}