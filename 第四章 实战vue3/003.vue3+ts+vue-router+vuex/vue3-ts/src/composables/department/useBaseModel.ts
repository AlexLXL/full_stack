import { reactive } from "vue";

export default function useBaseModel() {
  //表单验证规则
  const rules = reactive({})

  return {
    rules
  }
}