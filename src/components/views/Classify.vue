<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header">
                <span>新增分类</span>
            </div>
            <v-form  @addData="addData"></v-form>
        </el-card>

        <el-card class="table-card">
            <div slot="header" style="margin:-18px -20px; padding:18px 20px; background: #1296db;color:#fff">
                <span>分类详情</span>
            </div>
            <el-table :data="classifyData" highlight-current-row border :row-class-name="tableRowClassName" :header-cell-style="headClass">
                <el-table-column
                    type="index"
                    label="编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="第一分类/专业"
                    width="200">
                    <template slot-scope="scope">{{scope.row.parent[0]==undefined?'--':scope.row.parent[0].type_name}}</template>
                </el-table-column>
                <el-table-column
                    label="第二分类/类型"
                    width="120">
                    <template slot-scope="scope">{{scope.row.parent[1]==undefined?'--':scope.row.parent[1].type_name}}</template>
                </el-table-column>
                <el-table-column
                    label="第三分类/类别"
                    width="150">
                    <template slot-scope="scope">{{scope.row.parent[2]==undefined?'--':scope.row.parent[2].type_name}}</template>
                </el-table-column>
                <el-table-column
                    label="第四分类/材料"
                    width="300">
                    <template slot-scope="scope">{{scope.row.parent[3]==undefined?'--':scope.row.parent[3].type_name}}</template>
                </el-table-column>
                <el-table-column
                    label="编辑"
                    width="120">
                    <template slot-scope="scope">
                        <span class="edit-icon icon1" @click="edit(scope.row)"><i class="iconfont iconxiugai"></i></span>
                        <span class="edit-icon icon0" @click="del(scope.row.id)"><i class="iconfont iconshanchu"></i></span>
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
                :total="totals">
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
import vForm from '../common/Cform'
export default {
    components: {
        vForm
    },
    data() {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 20,
            totals: 0,
            classifyData: [],
            cellVal:{}
        }
    },
    watch: {
        totals(val,oldVal) {
            
            console.log(val)
            console.log(oldVal)
        }
    },
    mounted() {
        this.get_classify_data()
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%4 === 0) {
                return 'warning-row';
            } else if (rowIndex%4 === 2) {
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
            this.currentPage = 1
            this.get_classify_data()
        },
        handleCurrentChange(val){
            console.log(val)
            this.currentPage = val
            this.get_classify_data()
        },
        // 获取分类列表数据
        get_classify_data() {
            let params = {
                now_page: String(this.currentPage),
                page_size: String(this.pageSize)
            }
            this.get('useradmin/showall/type/', params).then((res) => {
                if(res.code == '0') {
                    this.classifyData = res.data.material
                    this.classifyData.map((item, index, arr) => {
                        item.parent.sort(this.compare('type_class'))
                    })

                    this.totals = parseInt(res.data.pagination.pagenum)
                    console.log(this.totals)
                }
            })
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
        edit(val) {
            this.cellVal = JSON.stringify(val)
            this.dialogFormVisible = true
        },
        del(id) {
            let params = {
                type_id: id
            }
            this.post('useradmin/delete/type/', params).then((res) => {
                if(res.code == '0') {
                    this.$message({
                        message: res.data,
                        type: 'success'
                    })
                    this.get_classify_data()
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
            this.get_classify_data()
        },
        addData(data) {
            this.get_classify_data()
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