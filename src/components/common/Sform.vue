<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="myForms" label-width="120px">
            <el-form-item label="公司名称" prop="company">
                <el-input v-model="ruleForm.company" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="legal_person">
                <el-input v-model="ruleForm.legal_person" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="telephone">
                <el-input v-model="ruleForm.telephone" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请填写公司地址"></el-input>
            </el-form-item>
            <el-form-item label="统一信用代码" prop="uscc">
                <el-input v-model="ruleForm.uscc" placeholder="请填写统一信用代码"></el-input>
            </el-form-item>
            <el-form-item label="经营状态" prop="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label="1">正常营业</el-radio>
                    <el-radio :label="0">注销</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button v-if="isEdit" type="primary" @click="edit">确认修改</el-button>
                <el-button v-else type="primary" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {isPhone, isCreditCode} from '../../validate/index'  // 导入验证
export default {
    name:'Bfrom',
    props:['cellVal'],
    data() {
        return {
            isEdit: false,
            ruleForm: {
                company: '',
                legal_person: '',
                telephone: '',
                address: '',
                uscc: '',
                status: '',
                id:''
            },
            rules: {
                company: [
                    { required: true, message: '请输入公司名称', trigger: 'change' }
                ],
                legal_person: [
                    { required: true, message: '请填写联系人', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, validator: isPhone, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请填写公司地址', trigger: 'blur' }
                ],
                uscc: [
                    { required: true, validator: isCreditCode, trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择经营状态', trigger: 'blur' }
                ],
            },
        }
    },
    watch:{
        cellVal:{
            handler(newVal, oldVal) {
                if(newVal == undefined) {
                    return false
                } else {
                    this.isEdit = true
                    this.ruleForm = JSON.parse(newVal)
                    console.log(this.ruleForm)
                }
            },
            immediate: true
        }
    },
    methods: {
        add() {
            this.funC('useradmin/add/supplier/')
        },
        edit() {
            this.funC('useradmin/update/supplier/')
        },
        funC(url) {
            this.$refs.myForms.validate((valid) => {
                if(valid) {
                    let params = {
                        company: this.ruleForm.company,
                        legal_person: this.ruleForm.legal_person,
                        telephone: this.ruleForm.telephone,
                        address: this.ruleForm.address,
                        uscc: this.ruleForm.uscc,
                        status: this.ruleForm.status,
                    }
                    if(this.isEdit) {
                        params.id = this.ruleForm.id
                    }
                    this.post(url, params).then((res) => {
                        if(res.code == '0') {
                            this.$message({
                                message: res.data,
                                type: 'success'
                            });
                            if(this.isEdit) {
                                this.$emit('showModel',false)
                            }
                        } else {
                            this.$message({
                                message: res.data,
                                type: 'warning'
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
.el-form
    max-width 500px
    overflow auto
</style>