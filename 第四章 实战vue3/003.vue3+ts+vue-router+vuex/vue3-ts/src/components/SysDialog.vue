<!-- 此处注意，使用 v-model="visible"绑定的形式
上线会报错

修改为如下方式
:model-value="visible"
 -->
<template>
  <el-dialog
    :title='title'
    :model-value="visible"
    :before-close="onClose"
    append-to-body
    :width="width + 'px'"
  >
    <div class="container" :style="{height:height + 'px'}">
      <slot name="content"></slot>
    </div>
    <template #footer>
            <span class="dialog-footer">
                <el-button type='danger' @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm">确定</el-button>
            </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import {ref, reactive} from 'vue'

const props = defineProps({
  title: {//弹框标题
    type: String,
    default: '标题'
  },
  visible: { //控制弹框的展示和影藏
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 250
  }
})
// 定义emit
const emit = defineEmits(['onClose', 'onConfirm'])
// 定义弹框的关闭
const onClose = () => {
  emit('onClose')
}
// 定义弹框的确定
const onConfirm = () => {
  emit('onConfirm')
}
</script>
<style lang="scss" scope>
.container {
  overflow-x: initial;
  overflow-y: auto;
}

.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;

  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;

    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }

    .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    padding: 10px;
  }

  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>