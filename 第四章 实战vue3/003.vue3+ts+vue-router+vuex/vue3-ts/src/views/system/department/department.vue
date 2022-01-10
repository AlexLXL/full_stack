<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchForm" :rules="rules" label-width="80px" :inline="true" size="small">
      <el-form-item>
        <el-input size="large" v-model="searchForm.searchName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" :icon="Search">查询</el-button>
        <!-- <el-button type="primary" :icon='Plus'>新增</el-button> -->
        <el-button size="large" type="primary" :icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      default-expand-all
      size="medium"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column width="200" align="center" label="操作">
        <template #default="scope">
          <el-button size="mini" type="success" :icon="Edit">编辑</el-button>
          <el-button size="mini" type="danger" :icon="Close">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script lang="ts" setup>
import useBaseModel from '@/composables/department/useBaseModel'
import useDepartmentTable from '@/composables/department/useDepartmentTable';
import {Edit,Close,Plus,Search} from '@element-plus/icons-vue'

let { rules } = useBaseModel()
let { searchForm, tableData, getTableData } = useDepartmentTable()

</script>

<style lang="scss" scoped>
</style>