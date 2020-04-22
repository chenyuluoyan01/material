<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header">
                <span>新增品牌</span>
            </div>
            <v-form @addData="addData"></v-form>
        </el-card>

        <el-card class="table-card">
            <div slot="header" style="margin:-18px -20px; padding:18px 20px; background: #1296db;color:#fff">
                <span>品牌详情</span>
            </div>
            <el-table :data="brandData" highlight-current-row border :row-class-name="tableRowClassName" :header-cell-style="headClass">
                <el-table-column
                    type="index"
                    label="编号"
                    fixed
                    width="80">
                </el-table-column>
                <el-table-column
                    label="第一分类/专业"
                    width="120">
                    <template slot-scope="scope">
                        {{JSON.stringify(scope.row.material.parent) == '{}'?'--': 
                        (scope.row.material.parent.parent_type_info == undefined || scope.row.material.parent.parent_type_info.length == 0)? '--' : 
                        scope.row.material.parent.parent_type_info[0] == undefined?'--' : 
                        scope.row.material.parent.parent_type_info[0].type_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="第二分类/类型"
                    width="120">
                    <template slot-scope="scope">
                        {{JSON.stringify(scope.row.material.parent) == '{}'?'--': 
                        (scope.row.material.parent.parent_type_info == undefined || scope.row.material.parent.parent_type_info.length == 0)? '--' : 
                        scope.row.material.parent.parent_type_info[1] == undefined?'--' : 
                        scope.row.material.parent.parent_type_info[1].type_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="第三分类/类别"
                    width="120">
                    <template slot-scope="scope">
                        {{JSON.stringify(scope.row.material.parent) == '{}'?'--': 
                        (scope.row.material.parent.parent_type_info == undefined || scope.row.material.parent.parent_type_info.length == 0)? '--' : 
                        scope.row.material.parent.parent_type_info[2] == undefined?'--' : 
                        scope.row.material.parent.parent_type_info[2].type_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="材料名称"
                    width="190">
                    <template slot-scope="scope">{{scope.row.material.name}}</template>
                </el-table-column>
                <el-table-column
                    label="规格"
                    width="130">
                    <template slot-scope="scope">{{scope.row.material.specifications}}</template>
                </el-table-column>
                <el-table-column
                    label="单位"
                    width="100">
                    <template slot-scope="scope">{{scope.row.material.unit}}</template>
                </el-table-column>
                <el-table-column
                    label="品牌名称"
                    width="170">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                    label="供应商"
                    width="120">
                    <template slot-scope="scope">{{scope.row.suppliers_id}}</template>
                </el-table-column>
                <el-table-column
                    label="编辑"
                    fixed="right"
                    width="120">
                    <template slot-scope="scope">
                        <!-- <span class="edit-icon icon1" @click="edit(scope.row)"><i class="iconfont iconxiugai"></i></span> -->
                        <el-popconfirm :title="'确定删除 '+scope.row.name+' 吗？'" @onConfirm="del(scope.row.id)">
                            <span class="edit-icon icon0" slot="reference"><i class="iconfont iconshanchu"></i></span>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pages">
                <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
                @size-change = "handleSizeChange"
                :current-page="currentPage"
                :page-sizes="[1, 20, 30, 50]"
                :page-size="pageSize"
                :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import vForm from '../common/Bform'
export default {
    components: {
        vForm
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 20,
            total: 5,
            brandData: []
        }
    },
    mounted() {
        this.getAllBrands()
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%4 === 1) {
                return 'warning-row';
            } else if (rowIndex%4 === 3) {
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
            this.getAllBrands()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getAllBrands()
        },
        // 获取供应商列表数据
        getAllBrands() {
            let params = {
                now_page: this.currentPage,
                page_size: this.pageSize
            }
            this.get('useradmin/select_all_brands/', params).then((res) => {
                if(res.code == 0) {
                    this.brandData = res.data.brands
                    this.total = parseInt(res.data.pagination.max_count)
                }
            })
        },
        addData(data) {
            this.getAllBrands()
        },
        del(id) {
            let params = JSON.stringify([String(id)])
            this.post('useradmin/brand_delete/', {id:params}).then((res) => {
                if(res.code == '2008') {
                    this.$message({
                        message: res.data,
                        type: 'success'
                    })
                    this.getAllBrands()
                } else {
                    this.$message({
                        message: res.data,
                        type: 'warning'
                    });
                }
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
.el-form
    max-width 300px
    overflow auto
.el-table
    width 1200px
</style>