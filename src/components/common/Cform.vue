<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="myForms" label-width="80px">
            <el-form-item label="类别等级" prop="type_class">
                <el-select v-model="ruleForm.type_class" placeholder="请选择类别等级"  @change="currentSel">
                    <el-option v-for="(val,index) in typeList" :label="val[1]" :value="val[0]" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别名称" prop="type_name" style="width:300px">
                <el-input v-model.trim="ruleForm.type_name"  @blur="inputFun"></el-input>
            </el-form-item>
            <el-form-item label="所属父类"  :prop="isRequired ? 'parentClass' : ''"  :required="isRequired ">
                <el-select v-model="ruleForm.parentClass" placeholder="请选择类别等级"  @change="currentSty">
                    <el-option :label="val.type_name" :value="val.id" v-for="(val,index) in styleList" :key="index"></el-option>
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
                <el-button v-if="isEdit" type="primary" @click="edit">确认修改</el-button>
                <el-button v-else type="primary" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props:['cellVal'],
    data() {
        return {
            isEdit: false,
             ruleForm: {
                type_class: '',
                type_name: '',
                parentClass: ''
            },
            isRequired: true,
            typeList: [],
            styleList: [],
            styleParentName:'',
            parentList: [],
            category:[],
            type_class:'', // 传给后台的type_class
            parent_id: '', // 传给后台的parent_id
            rules: {
                type_class: [
                    { required: true, message: '请选择类别等级', trigger: 'change' }
                ],
                type_name: [
                    { required: true, message: '请填写类别名称', trigger: 'blur' }
                ],
                parentClass: [
                    { required: true, message: '请填写类别名称', trigger: 'change' }
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
                    this.category = []
                    this.isEdit = true
                    this.ruleForm = JSON.parse(newVal)
                    this.parentList = this.ruleForm.parent
                    let label = this.parentList.find((item)=>{//这里的chargingWorkNameList就是上面遍历的数据源
                        return item.id == this.ruleForm.parent_type_id
                    })
                    this.ruleForm.parentClass = label.type_name
                    let styleName = this.ruleForm.type_name
                    this.styleList = this.parentList
                    this.styleList.sort(this.compare('type_class'))
                    this.styleList.pop()
                    this.styleList.map((item, index) => {
                        this.category.push(item.type_name)
                    })
                    this.category.push(styleName)
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.getType()
    },
    methods: {
        // 获取类别等级和所属父类列表项
        getType(val = '') {
            let primary = {
                type_class: val
            }
            let url = 'useradmin/search/type/'
            this.get(url, primary).then((res) => {
                if(res.code == 0) {
                    if(val != '') {
                        this.styleList = res.data
                    } else {
                        this.typeList = res.data.one_choice
                    }
                    
                }
            })
        },
        // 获取input中的值
        inputFun(e) {
            this.showClass()
        },
        // 选择等级类别
        currentSel(val) {
            console.log(val)
            // this.category = []
            this.styleList = []
            // 获取类别编号
            this.ruleForm.parentClass = ''
            let selVal = val - 1
            if(selVal > 0) {
                this.getType(selVal)
                this.isRequired = true
            } else {
                this.styleList = []
                this.isRequired = false
                this.styleParentName = ''
                // 没有父类
                this.parentList = []
                this.parent_id = ''
                this.type_class = ''
            }
            this.showClass()
        },
        // object排序
        compare(property) {
            return function(object1, object2) {
                let value1 = object1[property]
                let value2 = object2[property]
                if(value2 > value1) {
                    return -1
                } else if (value2 < value1) {
                    return 1
                } else {
                    return 0
                }
            }
        },
        // 选择所属父类
        currentSty(val) {
            console.log(val)
            let label = this.styleList.find((item)=>{//这里的chargingWorkNameList就是上面遍历的数据源
                return item.id == val;
                //筛选出匹配数据，是对应数据的整个对象
            });
            this.parent_id = val
            this.styleParentName = label.type_name
            this.type_class = label.type_class
            let proms = {
                type_id: val
            }
            this.get('useradmin/search/type/id/', proms).then((res) => {
                if(res.code == 0) {
                    if(res.data.parent_type_info) {
                        this.parentList = res.data.parent_type_info
                        if(this.parentList.length > 1) {
                            this.parentList.sort(this.compare('type_class'))
                            // this.parentList.pop()
                        }
                    } else {
                        this.parentList = []
                    }
                    this.showClass()
                }
            })
        },
        // 显示类别划分的方法
        showClass() {
            // 都有值的时候才显示出来
            if(this.ruleForm.type_class && this.ruleForm.type_name && this.ruleForm.parentClass) {
                let category = []
                if(this.parentList.length > 0) {
                    this.parentList.map((item, index) => {
                        category.push(item.type_name)
                    })
                }
                if(this.styleParentName == '') {
                    return false
                } else {
                    category.push(this.styleParentName)
                }
                category.push(this.ruleForm.type_name)
                this.category = category
            } else if(!this.isRequired && this.ruleForm.type_class && this.ruleForm.type_name) {
                let category = []
                category.push(this.ruleForm.type_name)
                this.category = category
            } else {
                this.category = []
            }
        },
        // 新增或修改类别
        add() {
            this.funC('useradmin/add/type/')
        },
        edit() {
            this.funC('useradmin/modify/type/')
        },
        funC(url) {
            this.$refs.myForms.validate((valid) => {
                if(valid) {
                    let parmas = {
                        parent_id:this.parent_id,
                        type_class:this.type_class+1,
                        name:this.ruleForm.type_name
                    }
                    if(this.isEdit) {
                        parmas.type_id = this.ruleForm.id
                    }
                    this.post(url, parmas).then((res) => {
                        if(res.code == '0') {
                            if(this.isEdit) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.$emit('showModel',false)

                            } else {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.$emit('addData',false)
                            }
                        } else if(res.code != '0'){
                            this.$message({
                                message: res.data,
                                type: 'warning'
                            });
                        }
                        this.ruleForm.type_name = ''
                    })
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
.class-list
    height 40px
</style>