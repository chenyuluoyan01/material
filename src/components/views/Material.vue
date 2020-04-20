<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header">
                <span>新增物资型号</span>
            </div>
            <v-form></v-form>
        </el-card>

        <el-card class="table-card">
            <div slot="header" style="margin:-18px -20px; padding:18px 20px; background: #1296db;color:#fff">
                <span>物资库</span>
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
                    <template slot-scope="scope">{{scope.row.company}}</template>
                </el-table-column>
                <el-table-column
                    label="第二分类/类型"
                    width="120">
                    <template slot-scope="scope">{{scope.row.legal_person}}</template>
                </el-table-column>
                <el-table-column
                    label="第三分类/类别"
                    width="150">
                    <template slot-scope="scope">{{scope.row.telephone}}</template>
                </el-table-column>
                <el-table-column
                    label="第四分类/材料"
                    width="300">
                    <template slot-scope="scope">{{scope.row.address}}</template>
                </el-table-column>
                <el-table-column
                    label="统一信用代码"
                    width="180">
                    <template slot-scope="scope">{{scope.row.uscc}}</template>
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
        <el-dialog title="修改品牌" :visible.sync="dialogFormVisible" :fullscreen="false" :append-to-body="true">
            <v-form></v-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyPwd">确 定</el-button>
            </div>
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
            classifyData: [
                {
                    "address": " 浙江杭州",
                    "company": "阿里巴巴",
                    "create_time": "2020-04-16 14:42:17",
                    "id": 1,
                    "is_delete": false,
                    "legal_person": " 马云",
                    "status": 1,
                    "telephone": "1781893500",
                    "update_time": "2020-04-16 14:42:17",
                    "uscc": "91330100716105852F"
                },
                {
                    "address": "广东深圳",
                    "company": "腾讯",
                    "create_time": "2020-04-16 14:43:17",
                    "id": 3,
                    "is_delete": false,
                    "legal_person": " 马化腾",
                    "status": 0,
                    "telephone": "17818935006",
                    "update_time": "2020-04-16 15:57:43",
                    "uscc": "91330100716105852F"
                },
            ]
        }
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
            this.get_classify_data()
        },
        handleCurrentChange(val){
            console.log(val)
            this.currentPage = val
            this.get_classify_data()
        },
        // 获取供应商列表数据
        get_classify_data() {

        },
        edit(val) {
            console.log(val)
            this.dialogFormVisible = true
        },
        // 点击确定修改
        modifyPwd() {

        },
        del(id) {
            console.log(id)
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