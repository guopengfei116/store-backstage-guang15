<template>
    <div class="login">
        <h1>后台管理</h1>
        <!-- model用来关联表单数据, rules用来指定校验规则 -->
        <el-form label-position="left" label-width="80px" ref="ruleForm2" 
            :model="formLabelAlign" :rules="rules">
            <!-- 如果要表单校验与重置功能, 必须加上prop属性 -->
            <el-form-item label="账号" prop="uname">
                <el-input v-model="formLabelAlign.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd">
                <el-input v-model="formLabelAlign.upwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
                <el-button >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {

            // 校验账号, 将来配置到下面的validator配置项
            function unameFn(rule, value, callback) {
                if(value == '') {
                    callback(new Error('账号不能为空'))
                }else {
                    callback();
                }
            }

            // 校验密码, 将来配置到下面的validator配置项
            function upwdFn(rule, value, callback) {
                if(value == '') {
                    callback(new Error('密码不能为空'))
                }else {
                    callback();
                }
            }

            return {
                // 表单提交的数据
                formLabelAlign: {
                    uname: '',
                    upwd: ''
                },

                // 表单校验规则
                rules: {
                    uname: [ 
                        {validator: unameFn, trigger: 'blur'} 
                    ],
                    upwd: [ 
                        {validator: upwdFn, trigger: 'blur'} 
                    ]
                }
            }
        },   

        methods: {

            // 登陆
            login() {
                this.$http.post(this.$api.login, this.formLabelAlign).then(res => {
                    if(res.data.status == 0) {
                        this.$alert('登陆成功, 马上跳转到首页');
                    }else {
                        this.$alert(res.data.message);
                    }
                });
            },

            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate(vali => {
                    if(vali) {
                        this.login();
                    }else {
                        this.$alert('哥们! 不带这么玩的');
                    }
                });
            }
        },
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
        padding: 20px;
        border: 1px solid #fff;
        border-radius: 6px;
    }

    h1 {
        position: absolute;
        top: -60px;
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: #fff;
    }
</style>