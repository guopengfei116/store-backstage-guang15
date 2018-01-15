<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>购物商城</el-breadcrumb-item>
            <el-breadcrumb-item  :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 按钮组 -->
        <div>
            <el-button size="mini" plain icon="el-icon-plus">新增</el-button>
            <el-button size="mini" plain icon="el-icon-check">全选</el-button>
            <el-button size="mini" plain icon="el-icon-delete">删除</el-button>
            <el-input style="width: 200px; float: right;" size="mini"
                placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>