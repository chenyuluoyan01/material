<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header">
                <span>新增物资型号</span>
            </div>
            <v-form @addData="addData"></v-form>
        </el-card>

        <el-card class="table-card">
            <div slot="header" style="margin:-18px -20px; padding:18px 20px; background: #1296db;color:#fff">
                <span>物资库</span>
            </div>
            <el-table :data="normsData" highlight-current-row border :row-class-name="tableRowClassName" :header-cell-style="headClass">
                <el-table-column
                    type="index"
                    label="编号"
                    fixed
                    width="80">
                </el-table-column>
                <el-table-column
                    label="第一分类/专业"
                    width="160">
                    <template slot-scope="scope">
                        {{scope.row.type_info.parent_type_info[0] == undefined? '--' : scope.row.type_info.parent_type_info[0].type_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="第二分类/类型"
                    width="160">
                    <template slot-scope="scope">
                        {{scope.row.type_info.parent_type_info[1] == undefined? '--' : scope.row.type_info.parent_type_info[1].type_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="第三分类/类别"
                    width="160">
                    <template slot-scope="scope">
                        {{scope.row.type_info.parent_type_info[2] == undefined? '--' : scope.row.type_info.parent_type_info[2].type_name}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="材料名称"
                    width="190">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column
                    label="规格"
                    width="130">
                    <template slot-scope="scope">{{scope.row.specifications}}</template>
                </el-table-column>
                <el-table-column
                    label="单位"
                    width="100">
                    <template slot-scope="scope">{{scope.row.unit}}</template>
                </el-table-column>
                <el-table-column
                    label="编辑"
                    fixed="right"
                    width="120">
                    <template slot-scope="scope">
                        <span class="edit-icon icon1" @click="edit(scope.row)"><i class="iconfont iconxiugai"></i></span>
                        <el-popconfirm :title="'确定删除吗？'" @onConfirm="del(scope.row.id)">
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

        <!-- 点击修改 -->
        <el-dialog title="修改物资型号" :visible.sync="dialogFormVisible" :fullscreen="false" :append-to-body="true">
            <v-form :cellVal = 'cellVal' @showModel="showModel"></v-form>
        </el-dialog>
    </div>
</template>

<script>
import vForm from '../common/Mform'
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
            cellVal:{},
            normsData: []
        }
    },
    mounted() {
        this.get_material_data()
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
            this.get_material_data()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.get_material_data()
        },
        // 获取供应商列表数据
        get_material_data() {
            let params = {
                now_page: String(this.currentPage),
                page_size: String(this.pageSize)
            }
            this.get('useradmin/select_all_norms/', params).then((res) => {
                if(res.code == 0) {
                    this.normsData = res.data.materials
                    this.total = parseInt(res.data.pagination.max_count)
                }
            })
            
        },
        edit(val) {
            this.cellVal = JSON.stringify(val)
            this.dialogFormVisible = true
        },
        // 点击确定修改
        del(id) {
            let params = [id]
            this.post('useradmin/norms_delete/', {id:JSON.stringify(params)}).then((res) => {
                if(res.code == '2008') {
                    this.$message({
                        message: res.data,
                        type: 'success'
                    })
                    this.get_material_data()
                } else {
                    this.$message({
                        message: res.data,
                        type: 'error'
                    })
                }
            })
        },
        showModel(data) {
            this.dialogFormVisible = data
            this.get_material_data()
        },
        addData(data) {
            this.get_material_data()
        }
    }
}
</script>

<style lang='stylus' scoped>
.el-form
    max-width 300px
    overflow auto
.el-table
    width 1151px
</style>