/**
 * 角色列表查询参数
 */
 export interface RoleListParm{
    userId:string | number;
    currentPage:number;
    pageSize:number;
    name:string;
    total:number;
}
/**
 * 角色类型定义
 */
export interface AddRoleModel{
    id:number | string;
    name:string;
    remark:string;
    createUser:string | number;
    type:string; //区分新增 、 编辑
}
export interface DeleteParm{
    id:number | string;
}
//分配权限树数据查询参数
export interface AssignTreeParm{
    userId:number | string;
    roleId:number | string;
}
/**
 * 分配权限保存参数
 */
export interface AssignSaveParm{
    roleId:string | number;
    list:Array<string | number>
}