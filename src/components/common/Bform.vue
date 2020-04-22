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
            <el-form-item label="规格" prop="norms" class="input-class">
                <el-select v-model="ruleForm.norms" placeholder="规格型号" >
                    <el-option :label="item.specifications" :value="item.id"  v-for='(item, i) in normsdata' :key="i"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌名称" prop="brandName" class="input-class">
                <el-input v-model="ruleForm.brandName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="supplied" class="input-class">
                <el-select v-model="ruleForm.supplied" placeholder="规格型号" @change="currentSup">
                    <el-option :label="item.company" :value="item.id"  v-for='(item, i) in supplierData' :key="i"></el-option>
                    <div style="bottom: 0;width: 100%;background: #fff">
                        <el-pagination
                        small
                        layout="sizes, prev, pager, next"
                        @current-change="handleCurrentChange"
                        @size-change = "handleSizeChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 20, 30, 50]"
                        :page-size="pageSize"
                        :total="total">
                        </el-pagination>
                    </div>
                </el-select>
            </el-form-item>

            <!-- <el-form-item label="类别划分" prop="Classification" class="input-class">
                <ul class="flex flex-start class-list">
                    <li v-for="(item, index) in category" :key="index">
                        <span>{{item}}</span>
                        <i class="iconfont iconarrow-right-copy-copy" v-if="index+1 != category.length"></i>
                    </li>
                </ul>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        let that = this
        return {
            currentPage: 1,
            pageSize: 20,
            total: 5,
            supplierData: [],
            supplierName: '',
             ruleForm: {
                material: '',
                brandName: '',
                supplied: '',
                norms: ''
            },
            // category:['给牌书', '管材', '塑料管'],
            rules: {
                material: [
                    { required: true, message: '请选择材料名称', trigger: 'change' }
                ],
                norms: [
                    { required: true, message: '请选择规格', trigger: 'change' }
                ],
                brandName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' }
                ],
                supplied: [
                    { required: true, message: '请填写供应商', trigger: 'change' }
                ],
            },
            material_id: '',
            normsdata: null,
            props: {
                checkStrictly : true,
                lazy:true,
                lazyLoad(node,resolve){
                    that.initData(node,resolve)
                }
            },
        }
    },
    mounted() {
        this.getSupplierData()
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
                this.material_id = id.slice(-1)[0] // 材料输入框中最后一个id
                let pramas = {
                    material_type_id: this.material_id
                }
                this.get('useradmin/select_materials/', pramas).then((res) => {
                    if(res.code == '0') {
                        this.normsdata = res.data
                    }
                })
            }
        },
        currentSup(val) {
            let label = this.supplierData.find((item)=>{//这里的chargingWorkNameList就是上面遍历的数据源
                return item.id == val;
                //筛选出匹配数据，是对应数据的整个对象
            });
            this.supplierName = label.company
        },
        // 分页功能
        handleSizeChange(val){    
            this.pageSize = val
            this.getSupplierData()
        },
        handleCurrentChange(val){
            console.log(val)
            this.currentPage = val
            this.getSupplierData()
        },
        // 获取供应商列表数据
        getSupplierData() {
            let params = {
                now_page: this.currentPage,
                page_size: this.pageSize
            }
            this.get('useradmin/add/supplier/', params).then((res) => {
                if(res.code == '0') {
                    this.supplierData = res.data.datas
                    this.total = parseInt(res.data.pagination.max_count)
                }
            })
        },
        submit() {
            console.log(this.ruleForm.norms)
            this.$refs.myForms.validate((valid) => {
                if(valid) {
                    let params = [{
                        material_id: this.ruleForm.norms,
                        name: this.ruleForm.brandName,
                        suppliers: this.ruleForm.supplied
                    }]

                    this.post('useradmin/brand_add/', {material:JSON.stringify(params)}).then((res) => {
                        if(res.code == '2008') {
                            this.$message({
                                message: res.data,
                                type: 'success'
                            })
                            this.$emit('addData',false)
                        }
                    })
                }
            })
        }
    }
    
}
</script>

<style lang='stylus' scoped>
.el-form
    // max-width 300px
    overflow auto
.input-class
    .el-input,.el-cascader,.el-textarea,.el-select
        width 300px
</style>