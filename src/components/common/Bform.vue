<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="myForms" label-width="80px">
            <el-form-item label="品牌名称" prop="brandName">
                <el-input v-model="ruleForm.brandName"></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="supplied">
                <el-input v-model="ruleForm.supplied"></el-input>
            </el-form-item>
            <el-form-item label="材料名称" prop="material">
                <el-select v-model="ruleForm.material" placeholder="请选择类别等级">
                    <el-option label="类别1" value="1"></el-option>
                    <el-option label="类别1" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别划分" prop="Classification">
                <ul class="flex flex-start class-list">
                    <li v-for="(item, index) in category" :key="index">
                        <span>{{item}}</span>
                        <i class="iconfont iconarrow-right-copy-copy" v-if="index+1 != category.length"></i>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() { 
        return {
             ruleForm: {
                brandName: '',
                supplied: '',
                material: ''
            },
            category:['给牌书', '管材', '塑料管'],
            rules: {
                brandName: [
                    { required: true, message: '请选择类别等级', trigger: 'blur' }
                ],
                className: [
                    { required: true, message: '请填写类别名称', trigger: 'blur' }
                ],
                parentClass: [
                    { required: true, message: '请填写类别名称', trigger: 'change' }
                ],
            },
        }
    }
}
</script>

<style lang='stylus' scoped>
.el-form
    max-width 300px
    overflow auto
</style>