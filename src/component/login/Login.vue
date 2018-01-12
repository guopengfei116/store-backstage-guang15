<template>
    <div>
        登陆页面
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

</style>