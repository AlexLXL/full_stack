import {reactive} from 'vue'
import {DialogModel} from "@/type/BastType"

export default function useDialog() {
  //定义弹框属性
  const dialog = reactive<DialogModel>({
    title: '',
    visible: false,
    width: 630,
    height: 280
  })

  //展示
  const onShow = () => {
    dialog.visible = true;
  }

  //关闭
  const onClose = () => {
    dialog.visible = false;
  }

  return {
    dialog,
    onShow,
    onClose
  }
}