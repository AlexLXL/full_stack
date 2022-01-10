import {getCurrentInstance, ComponentInternalInstance} from "vue";

/**
 * proxy 获取页面refs
 * global 获取全局工具类（也可以拿elementui的弹窗组件）
 */
export default function useInstance() {
  const {appContext, proxy} = getCurrentInstance() as ComponentInternalInstance
  const global = appContext.config.globalProperties;
  return {
    proxy,
    global
  }
}