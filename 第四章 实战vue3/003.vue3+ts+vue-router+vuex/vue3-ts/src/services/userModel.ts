/**
 * 登录请求参数类型
 */
export interface LoginParm {
  username: string;
  password: string;
  code: string;
}

/**
 * 登录成功返回值类型
 */
export interface LoginResult {
  id: number;
  token: string;
  code: number;
  expireTime: number;
}

/**
 * 用户信息
 */
export interface UserInfo {
  avatar: string;
  id: string;
  introduction: string;
  name: string;
  roles: Array<string>
}

/**
 * 用户列表查询参数
 */
export interface UserListParams {
  deptId: string | number;
  loginName: string;
  currentPage: number;
  pageSize: number;
  total: number;
}

/**
 * 表单提交的参数
 */
export interface AddUserModel {
  type: string; //判断新增还是编辑
  id: string | number;
  deptId: string | number;
  deptName: string;
  loginName: string;
  mobile: string;
  nickName: string;
  email: string;
  username: string;
  password: string;
  sex: string;
}

/**
 * 分配角色列表参数
 */
export interface AssignRoleListParm {
  currentPage: number,
  pageSize: number,
  userId: string | number,
  total: number,
}

export interface SelectRoleParm {
  roleId: string | number;
  userId: string | number;
}