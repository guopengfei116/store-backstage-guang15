<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" 
            class="demo-ruleForm" style="width: 750px">

            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="副标题" prop="sub_title">
                <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>

            <el-form-item label="所属类别" prop="category_id">

                <!-- v-model绑定数据, 将来要和每个option的value值进行匹配, 匹配到哪个默认就会选中那个 -->
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">

                    <!-- goodsCategory是请求接口获取到的分类列表, 将来用户要选择其中一个分类的ID传给后端 -->
                    <el-option v-for="item in goodsCategory" :key="item.category_id" 
                        :label="item.title" :value="item.category_id">

                        <!-- option标签内可以嵌套子标签, 但是option的label属性不能删掉 -->
                        <span>
                            <span v-if="item.class_layer != 1">|- </span>
                            <span>{{ item.title }}</span>
                        </span>	  

                    </el-option>

                </el-select>

            </el-form-item>

            <el-form-item label="是否发布">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            <el-form-item label="推荐类型">
                <el-switch active-text="轮播图" v-model="ruleForm.is_slide"></el-switch>
                <el-switch active-text="置顶" v-model="ruleForm.is_top"></el-switch>
                <el-switch active-text="热门" v-model="ruleForm.is_hot"></el-switch>
            </el-form-item>

            <el-form-item label="上传封面" prop="imgList">

                <!-- action属性用来设置图片上传地址, file-list属性用来关联图片列表 -->
                <!-- on-preview与on-remove用来添加回调函数的, 注意他们是属性的方式添加 -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                    :on-success="imgUploaded" :on-remove="imgRemove" :file-list="ruleForm.imgList" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

            </el-form-item>

            <el-form-item label="上传附件">

                <!-- action属性用来设置图片上传地址, file-list属性用来关联图片列表 -->
                <!-- on-preview与on-remove用来添加回调函数的, 注意他们是属性的方式添加 -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile"
                    :on-success="fileUploaded" :file-list="ruleForm.fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>

            </el-form-item>

            <el-form-item label="货号" prop="goods_no">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>

            <el-form-item label="库存" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>

            <el-form-item label="市场价" prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售价" prop="sell_price">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
            
            <el-form-item label="摘要" prop="zhaiyao">
                <el-input v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="详细内容" prop="content">
                <quill-editor v-model="ruleForm.content"></quill-editor>
                <!-- <el-input type="textarea" v-html="ruleForm.content"></el-input> -->
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
                <el-button>返回上一页</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    // 导入富文本插件样式与组件 
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data() {

            // 专门为封面图准备的校验函数
            function validateImg(rule, value, callback) {
                if (value === '' || value.length == 0) {
                    callback(new Error('请上传一张封面图'));
                } else {
                    callback();
                }
            };

            return {
                // 当前编辑的商品ID
                id: null,

                // 分类列表数据
                goodsCategory: [],

                // 表单数据
                ruleForm: {},

                // 表单校验规则
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 5, max: 50, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    sub_title: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                        { min: 5, max: 50, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    category_id: [
                        { required: true, message: '请选择商品分类', trigger: 'blur' },
                        { type: 'number', message: '值必须为数字', trigger: 'blur' }
                    ],
                    goods_no: [
                        { required: true, message: '请输入商品编号', trigger: 'blur' }
                    ],
                    stock_quantity: [
                        { required: true, message: '请输入库存', trigger: 'blur' }
                    ],
                    market_price: [
                        { required: true, message: '请输入市场价', trigger: 'blur' }
                    ],
                    sell_price: [
                        { required: true, message: '请输入销售价', trigger: 'blur' }
                    ],
                    zhaiyao: [
                        { required: true, message: '请输入摘要', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入描述信息', trigger: 'blur' }
                    ],
                    imgList: [
                        { validator: validateImg, trigger: 'submit' }
                    ]
                }
            };
        },

        methods: {

            // 修改商品数据
            goodsModify() {
                this.$http.post(this.$api.gsEdit + this.id, this.ruleForm).then(res => {
                    if(res.data.status == 0) {

                        this.$alert('马上跳回商品列表页', '修改成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push({ name: 'goodsCtList' });
                            }
                        });
       
                    }
                });
            },

            // 保存修改
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.goodsModify();
                    } else {
                        this.$alert('error submit!!');
                        return false;
                    }
                });
            },

            // 获取商品数据
            getGoods() {
                this.$http.get(this.$api.gsDetail + this.id).then(res => {
                    this.ruleForm = res.data.message;

                    // 默认是个string, 给它转换成number类型, 这样它就会自动和分类option的value进行匹配
                    this.ruleForm.category_id = +this.ruleForm.category_id;  
                });
            },

            // 获取商品分类
            getGoodsCategory() {
                this.$http.get(this.$api.ctList + 'goods').then(res => {
                    this.goodsCategory = res.data.message;
                });
            },

            // 封面上传成功回调
            // 注意: 商品的封面后端接口只能设一个, 不能设多个, 所以每次我们上传成功后把原有的封面覆盖掉
            imgUploaded(res, file, fileList) {
                this.ruleForm.imgList = [res];
            },

            // 删除封面图
            // 1 获取file.url信息
            // 2 然后遍历this.ruleForm.imgList, 从中删除掉与之相同url的图片数据
            imgRemove(file, fileList) {
                let removeUrl = file.url; 
                this.ruleForm.imgList = this.ruleForm.imgList.filter(v => v.url != removeUrl);
            },

            // 附件上传成功回调
            // 注意: 附件后端接口可以设多个, 所以每次成功后我们在原来的基础上push新附件
            fileUploaded(res, file, fileList) {
                this.ruleForm.fileList.push(res);
            }

        },

        // 组件初始化完毕后, 先拿到url中的id, 在请求接口获取商品数据进行回显
        created() {
            this.id = this.$route.params.id;
            this.getGoods();
            this.getGoodsCategory();
        },

        components: {
            quillEditor,
        }
    }
</script>

<style scoped>

</style>