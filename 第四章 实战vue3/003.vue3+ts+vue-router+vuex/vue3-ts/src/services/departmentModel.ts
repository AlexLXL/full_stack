export interface IListParams {
  searchName: string;
}

export interface ITableData {
  list: any;
}

//部门表格每行数据的格式
export interface DeptModel {
  id: number;
  pid: number;
  likeId: number;
  parentName: string;
  manager: string;
  name: string;
  deptCode: string;
  deptAddress: string;
  deptPhone: string;
  orderNum: number;
  open: boolean;
  children: Array<DeptModel>
}

//表单提交的数据类型
export interface AddDeptModel {
  type: string;
  id: string | number;
  pid: string | number;
  parentName: string;
  manager: string;
  deptAddress: string;
  deptPhone: string;
  name: string;
  deptCode: string;
  orderNum: string;
}

//上级部门树选中的数据
export interface SelectNode {
  id: string | number;
  name: string;
}

