<template>
    <div>
        <Aside></Aside>
        <Header></Header>
    </div>
</template>

<script>
    import Header from './common/Header.vue';
    import Aside from './common/Aside.vue';

    export default {

        // 注册子组件, 下面使用了es6语法
        components: {
            Header,
            Aside
        }
    }
</script>

<style scoped>

</style>