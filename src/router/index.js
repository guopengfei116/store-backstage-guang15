// 导入组件
import Login from '../component/login/Login.vue';
import Register from '../component/register/Register.vue';

// 该文件对外导出路由配置
export default {

    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: 'register', path: '/register', component: Register },
    ]

};
