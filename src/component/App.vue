<template>
    <div>
        公共头部
        <router-view></router-view>
        <el-rate
            v-model="value"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
        公共底部
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 5
            };
        }
    }
</script>

<style scoped>

</style>