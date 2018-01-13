<template>
    <div class="login">
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                a: 10,
                b: 20
            }
        },

        // 组件初始化完毕, 自动调用
        created() {
            // 测试
            this.$http.get(this.$api.islogin).then(res => {
                console.log(res.data);
            });
        }
    }
</script>

<style scoped>
    .login {
        width: 400px;
        height: 200px;
        margin: 0 auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid red;
    }
</style>