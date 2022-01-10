/**
 * 清空表单
 * @param fromRef  表单的ref属性
 * @param obj      表单绑定的model
 */
export default function resetForm(fromRef: any, obj: any) {
  //清除表单的验证
  if (fromRef) {
    fromRef.resetFields();
    fromRef.clearValidate();
  }
  //清空数据
  Object.keys(obj).forEach(key => {
    obj[key] = ''
  })
}