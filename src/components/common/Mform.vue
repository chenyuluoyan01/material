<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="myForms" label-width="80px">
            <el-form-item label="材料名称" prop="material" class="input-class">
                <el-cascader 
                :props="props" 
                clearable 
                v-model="ruleForm.material" 
                @change="changeData" 
                placeholder="请选择材料名称" 
                ref="myCascader">
                </el-cascader>
            </el-form-item>

            <el-form-item label="规格型号" prop="specifications" class="input-class">
                <el-input v-model="ruleForm.specifications"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit" class="input-class">
                <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <!-- <el-form-item label="其他说明" prop="desc" class="input-class">
                <el-input type="textarea" v-model="ruleForm.desc" :rows="4"></el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button v-if="isEdit" type="primary" @click="edit">确认修改</el-button>
                <el-button v-else type="primary" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
let id = 0;
export default {
    props:['cellVal'],
    data() {
        let that = this
        return {
            isEdit: false,
            // allOptions: [{
            //     value:1,
            //     label: '一致'
            // }],
             ruleForm: {
                material: '',
                specifications: '',
                unit: '',
            },
            rules: {
                material: [
                    { required: true, message: '请选择材料名称', trigger: 'change' }
                ],
                specifications: [
                    { required: true, message: '请填写材料型号', trigger: 'blur' }
                ],
                unit: [
                    { required: true, message: '请填写材料单位', trigger: 'change' }
                ],
            },
            props: {
                checkStrictly : true,
                lazy:true,
                lazyLoad(node,resolve){
                    that.initData(node,resolve)
                }
            },
            material:''
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
                }
            },
            immediate: true
        }
    },
    methods: {
        initData(node,resolve) {
            setTimeout(() => {
                if (node.level == 0) {
                    this.get('useradmin/search/type/',{type_class: '1'}).then((res) => {
                        let newData = res.data
                        newData.forEach(function(value, index) {
                            value.label = value.type_name
                            value.value = value.id
                            value.leaf = node.level >= 2
                            delete value.parent_type_id
                            delete value.update_time
                            delete value.create_time
                            delete value.is_delete
                            delete value.id
                            delete value.type_name
                        })
                        resolve(newData)
                    })
                } else if(node.level == 1) {
                    this.get('useradmin/search/type/id/',{type_id: node.value}).then((res) => {
                        let newData = res.data.children
                        newData.forEach(function(value, index) {
                            value.label = value.type_name
                            value.value = value.id
                            value.leaf = node.level >= 2
                        })
                        resolve(newData)
                    })
                } else if(node.level == 2) {
                    this.get('useradmin/search/type/id/',{type_id: node.value}).then((res) => {
                        let newData = res.data.children
                        newData.forEach(function(value, index) {
                            value.label = value.type_name
                            value.value = value.id
                            value.leaf = node.level >= 2
                        })
                        resolve(newData)
                    })
                }
            }, 100)
        },
        changeData(id) {
            if(id == undefined) {
                return false
            } else {
                this.material_type = id.slice(-1)[0]
                this.material_type = id.slice(-1)[0] // 材料输入框中最后一个id
                this.material = this.$refs.myCascader.getCheckedNodes()[0].label
            }
        },
        edit() {
            this.funC('useradmin/norms_update/')
        },
        add() {
            this.funC('useradmin/norms_add/')
        },
        funC(url) {
            this.$refs.myForms.validate((valid) => {
                if(valid) {
                    let parmas = []
                    let _parmas = null
                    if(this.isEdit) {
                        parmas = [{
                            specifications: this.ruleForm.specifications, // 规格
                            id: this.ruleForm.id,
                            material_type_id: this.material_type, // 选择材料分类的id
                            unit: this.ruleForm.unit
                        }]
                        _parmas = {material:JSON.stringify(parmas)}
                    } else {
                        parmas = [{
                            material_type: this.material_type, // 材料id
                            material: this.material, // 材料名称
                            unit: this.ruleForm.unit, // 单位
                            specifications: this.ruleForm.specifications // 规格
                        }]
                        _parmas = {material_key:this.material_type, material:JSON.stringify(parmas)}
                    }
                    this.post(url, _parmas).then((res) => {
                        if(res.code == '2008') {
                            if(this.isEdit) {
                                this.$message({
                                    message: res.data,
                                    type: 'success'
                                });
                                this.$emit('showModel',false)

                            } else {
                                this.$message({
                                    message: res.data,
                                    type: 'success'
                                });
                                this.$emit('addData',false)
                            }
                        } else if(res.code != '2008'){
                            this.$message({
                                message: res.data,
                                type: 'warning'
                            });
                        }
                        // this.ruleForm.specifications = ''
                        // this.ruleForm.unit = ''
                    })
                }
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
.el-form
    overflow auto
.el-cascader-panel
    height 300px
.input-class
    .el-input,.el-cascader,.el-textarea
        width 300px
</style>