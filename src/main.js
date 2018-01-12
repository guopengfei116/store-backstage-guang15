// 一 导入第三方包
import Vue from 'vue';

// 二 导入自己写的东西
import App from './component/App.vue';

// 把根组件渲染到指定视图
new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement(App);
    }
});
