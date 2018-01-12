// 1.1 导入vue相关的第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';

// 1.2 启动vue插件
Vue.use(VueRouter);

// 2.1 导入自己写的根组件
import App from './component/App.vue';

// 2.2 导入路由配置
import routerConfig from './router/index.js';

// 3 导入axios, 因为它不是vue插件, 使用起来不方便, 所以我们手动把它加到原型中, 方便使用
import axios from 'axios';
axios.defaults.baseURL = 'http://157.122.54.189:9095'; // 一配置, 以后所有的请求就会自动使用这个域名
Vue.prototype.$http = axios;

// 4 导入api配置对象, 为了使用更加方便, 把它也加到原型中
import api from './js/api-config.js';
Vue.prototype.$api = api;

// 把根组件渲染到指定视图
new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement(App);
    },
    router: new VueRouter(routerConfig)
});
