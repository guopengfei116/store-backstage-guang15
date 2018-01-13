<template>
    <el-dropdown class="header">
        <span class="el-dropdown-link">
            <span>你好, {{ uname }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>modify</el-dropdown-item>
            <!-- 默认情况下, 监听组件的事件都是监听组件自己emit发射的事件 -->
            <!-- 如果要监听浏览器原生事件, 添加一个native修饰符即可 -->
            <el-dropdown-item @click.native="logout">logout</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        data() {
            return {
                uname: 'admin'
            }
        },

        methods: {
            logout() {
                this.$http.get(this.$api.logout).then(res => {
                    if(res.data.status == 0) {
                        this.$router.push({ name: 'login' });
                    }else {
                        this.$alert(res.data.message);
                    }
                });
            }
        },
    }
</script>

<style scoped>
    .header {
        display: block;
        text-align: right;
        line-height: 60px;
    }
</style>