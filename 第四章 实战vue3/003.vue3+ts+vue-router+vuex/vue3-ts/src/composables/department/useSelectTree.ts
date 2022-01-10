import {ref} from 'vue'

export default function useSelectTree() {
  //parent组件的ref属性
  const selectTreeRef = ref<{ show: () => void }>()

  //选择上级部门
  const selectTree = () => {
    selectTreeRef.value?.show();
  }
  return {
    selectTreeRef,
    selectTree
  }
}