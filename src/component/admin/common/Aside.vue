<template>
    <el-menu default-active="2" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose">

        <!-- 一个菜单项, 记得配置index属性, 不配置会有问题 -->
        <el-submenu v-for="item in menu" :key="item.title" :index="item.title">

            <!-- 标题内容 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.title }}</span>
            </template>

            <!-- 子菜单列表 -->
            <el-menu-item v-for="subitem in item.children" :key="subitem.title" :index="subitem.title">
                <router-link :to="subitem.path">{{ subitem.title }}</router-link>
            </el-menu-item>

        </el-submenu>

    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                // 1 菜单很多项, 所以是个大数组
                // 2 数组里面存放的数据比较杂, 所以是一个对象
                // 2.1 对象里面应该有个title字段
                // 2.2 对象里面应该有个children字段存放子菜单, 是个数组
                // 3 children字段里面又放置很多对象
                // 3.1 有个titlle字段代表子菜单标题
                // 3.2 有个path字段代表点击该标题时跳转的路径
                menu: [
                    {
                        title: '资源下载',
                        children: [
                            { title: '内容管理', path: '/a' },
                            { title: '类别管理', path: '/b' },
                            { title: '评论管理', path: '/c' },
                        ]
                    },
                    {
                        title: '购物商城',
                        children: [
                            { title: '内容管理', path: '/a' },
                            { title: '类别管理', path: '/b' },
                            { title: '评论管理', path: '/c' },
                        ]
                    },
                    {
                        title: '订单管理',
                        children: [
                            { title: '内容管理', path: '/a' },
                            { title: '类别管理', path: '/b' },
                            { title: '评论管理', path: '/c' },
                        ]
                    },
                ]
            }
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>