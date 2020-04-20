<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header">
                <span>新增供应商</span>
            </div>
            <v-form></v-form>
        </el-card>

        <el-card class="table-card">
            <div slot="header" style="margin:-18px -20px; padding:18px 20px; background: #1296db;color:#fff">
                <span>供应商列表</span>
            </div>
            <el-table :data="supplierData" border :row-class-name="tableRowClassName" :header-cell-style="headClass">
                <el-table-column
                    type="index"
                    label="编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="公司名"
                    width="200">
                    <template slot-scope="scope">{{scope.row.company}}</template>
                </el-table-column>
                <el-table-column
                    label="联系人"
                    width="120">
                    <template slot-scope="scope">{{scope.row.legal_person}}</template>
                </el-table-column>
                <el-table-column
                    label="联系方式"
                    width="150">
                    <template slot-scope="scope">{{scope.row.telephone}}</template>
                </el-table-column>
                <el-table-column
                    label="公司地址"
                    width="300">
                    <template slot-scope="scope">{{scope.row.address}}</template>
                </el-table-column>
                <el-table-column
                    label="统一信用代码"
                    width="180">
                    <template slot-scope="scope">{{scope.row.uscc}}</template>
                </el-table-column>
                <el-table-column
                    label="经营状态"
                    width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status==1" effect="dark">正常营业</el-tag>
                        <el-tag type="danger" v-else effect="dark">注销</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="编辑"
                    width="120">
                    <template slot-scope="scope">
                        <span class="edit-icon icon1" @click="edit(scope.row)"><i class="iconfont iconxiugai"></i></span>
                        <el-popconfirm :title="'确定删除 '+scope.row.company+' 吗？'" @onConfirm="del(scope.row.id)">
                            <!-- <el-button slot="reference">删除</el-button> -->
                            <span class="edit-icon icon0" slot="reference"><i class="iconfont iconshanchu"></i></span>
                        </el-popconfirm>
                        <!-- <span class="edit-icon icon0" @click="del(scope.row.id)"><i class="iconfont iconshanchu"></i></span> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pages">
                <el-pagination
                background
                layout="sizes, prev, pager, next"
                @current-change="handleCurrentChange"
                @size-change = "handleSizeChange"
                :current-page="currentPage"
                :page-sizes="[1, 20, 30, 50]"
                :page-size="pageSize"
                :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!-- 点击修改 -->
        <el-dialog title="修改供应商" :visible.sync="dialogFormVisible" :fullscreen="false" :append-to-body="true">
            <v-form :cellVal = 'cellVal' @showModel="showModel"></v-form>
            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyPwd">确 定</el-button>
            </div> -->
        </el-dialog>



    </div>
</template>

<script>
import vForm from '../common/Sform'
export default {
    components: {
        vForm
    },
    data() {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 20,
            total: 5,
            supplierData: [],
            cellVal:{}
        }
    },
    mounted() {
        this.getSupplierData()
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        headClass () {
            return 'text-align: center;background:#eef1f6;'
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
                    this.total = res.data.pagination.pagenum
                }
            })
        },
        edit(val) {
            // this.$set(this.cellVal, 'company', val.company)
            // this.$set(this.cellVal, 'legal_person', val.legal_person)
            // this.$set(this.cellVal, 'telephone', val.telephone)
            // this.$set(this.cellVal, 'address', val.address)
            // this.$set(this.cellVal, 'uscc', val.uscc)
            // this.$set(this.cellVal, 'status', val.status)
            this.cellVal = JSON.stringify(val)
            this.dialogFormVisible = true
        },
        del(id) {
            console.log(id)
            let params = {
                id: id
            }
            this.get('useradmin/delete/supplier/', params).then((res) => {
                if(res.code == '0') {
                    this.$message({
                        message: res.data,
                        type: 'success'
                    })
                    this.getSupplierData()
                } else {
                    this.$message({
                        message: res.data,
                        type: 'warning'
                    });
                }
            })
        },
        // 父组件接受子组件的传值，修改dialog的显示状态
        showModel(data) {
            this.dialogFormVisible = data
        }
    },
}
</script>

<style lang = "stylus">
/* .el-table
    .warning-row
        background oldlace

.el-table
    .success-row
        background #f0f9eb */
</style>