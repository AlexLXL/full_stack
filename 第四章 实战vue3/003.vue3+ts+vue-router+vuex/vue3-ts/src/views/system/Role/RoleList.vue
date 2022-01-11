<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParams" label-width="80px" :inline="true" size="mini">
      <el-form-item>
        <el-input placeholder="请输入角色名称" v-model="listParams.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="roleTable.list" border stripe>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="角色备注"></el-table-column>
      <el-table-column label="操作" align="center" width="320">
        <template #default>
          <el-button type="primary" size="mini" :icon="Edit">编辑</el-button>
          <el-button type="primary" size="mini" :icon="Setting">分配权限</el-button>
          <el-button type="danger" size="mini" :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParams.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParams.total"
      background
    ></el-pagination>
  </el-main>
</template>
<script setup lang="ts">
import {ref, nextTick, onMounted} from 'vue';
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import useRoleTable from '@/composables/role/useRoleTable';

//表格列表
const {listParams, getRoleList, roleTable, searchBtn, resetBtn, sizeChange, currentChange} = useRoleTable()

//表格高度
const tableHeight = ref(0);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>