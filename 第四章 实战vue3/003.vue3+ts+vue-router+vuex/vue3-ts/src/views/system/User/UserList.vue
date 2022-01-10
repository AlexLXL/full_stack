<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec">
      <!-- Aside content -->
      <LeftTree ref="userLeftTree" @treeClick="treeClick"></LeftTree>
    </el-aside>
    <el-main>
      <!-- 搜索栏 -->
      <el-form :model="listParams" label-width="80px" :inline="true" size="mini">
        <el-form-item label>
          <el-input v-model="listParams.loginName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" :icon="Search" @click="searchBtn">搜索</el-button>
          <el-button size="mini" :icon="Close" @click="resetBtn">重置</el-button>
          <el-button size="mini" type="primary" :icon="Plus" @click="addBtn">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 用户表格 -->
      <el-table :height="tableHeight" :data="tableData.list" border stripe>
        <el-table-column prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" width="320" label="操作">
          <template #default="scope">
            <el-button type="primary" size="mini" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" :icon="Setting" @click="assignBtn(scope.row)">分配角色</el-button>
            <el-button type="danger" size="mini" :icon="Delete" @click="deleteBtn(scope.row.id)">删除</el-button>
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
        :total="listParams.total"
        layout="total, sizes, prev, pager, next, jumper"
        background
      ></el-pagination>
    </el-main>
  </el-container>
  <AddAndEditVue ref="userAddRef" @save='save'></AddAndEditVue>
</template>
<script setup lang="ts">
import {Search, Close, Plus, Delete, Edit, Setting} from '@element-plus/icons-vue';
import LeftTree from './LeftTree.vue';
import useUserTable from '@/composables/userManager/useUserTable';
import AddAndEditVue from './AddAndEdit.vue';
import useUserBtn from "@/composables/userManager/useUserBtn";
import {ref, onMounted, nextTick} from 'vue'
//容器高度
const containerHeight = ref(0);
//表格高度
const tableHeight = ref(0);
//表格数据
const {listParams, tableData, getUserList, treeClick, sizeChange, currentChange, searchBtn, resetBtn} = useUserTable();
//新增、编辑、删除
const {userAddRef, addBtn, editBtn, deleteBtn, assignBtn, save} = useUserBtn(getUserList);
onMounted(() => {
  nextTick(() => {
    containerHeight.value = window.innerHeight - 100
    tableHeight.value = window.innerHeight - 220
  })
})
</script>