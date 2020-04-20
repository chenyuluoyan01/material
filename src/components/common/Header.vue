<template>
    <div class="head-warp">
        <div class="nav flex flex-between">
            <div class="flex flex-left">
                <p class="logo-txt">闽宸建筑</p>
                <div class="toggle-button" @click="toggleCollapse">
                    <i class="iconfont" :class="{iconzhankai2:!$store.state.isCollapse,iconzhedie1:$store.state.isCollapse}"></i>
                </div>
            </div>
            <div class="flex flex-left">
                <div class="dropdown">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" class="user-avatar">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, i) in downList" :key="i" @click.native="click_drop(i)">{{item}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>


        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="新密码" prop="newPwd" :label-width="formLabelWidth">
                    <el-input v-model="form.newPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm" :label-width="formLabelWidth">
                    <el-input v-model="form.confirm" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="vscode" :label-width="formLabelWidth">
                    <el-input v-model="form.vscode" autocomplete="off"></el-input>
                    <span class="get-code" @click="getCodes()" v-show="!hasCode">获取验证码</span>
                    <span class="get-code" v-show="hasCode">{{countdown+'s'}}</span>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyPwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        let validateNewPassword = (rule, value, callback) => {
            if (value !== this.form.newPwd) {
                callback(new Error('与新密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            fullscreen: false,
            downList:["修改密码", "退出登录"],
            form: {
                newPwd: '',
                confirm: '',
                vscode: '',
            },
            hasCode: false,
            countdown:60,
            timer:null,
            dialogFormVisible: false,
            rules: {
                newPwd: [
                    { required: true, pattern: /^.{6,20}$/, trigger: 'blur' ,message:'请输入6位以上的数字或字母或字符'},
                ],
                confirm: [
                    { required: true, validator: validateNewPassword, trigger: 'blur' },
                ],
                vscode: [
                    { required: true,  trigger: 'blur,change', pattern: /\d{4}/,message:'请输入4位数验证码'}
                ]
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        toggleCollapse () {
            // this.isCollapse = !this.isCollapse
            // this.$store.state.isCollapse = !this.$store.state.isCollapse
            let msg = !this.$store.state.isCollapse
            console.log(msg)
            this.$store.commit('isCollapse', msg)
        },
        // 点击下拉菜单
        click_drop(i) {
            if(i == 0) {
                this.dialogFormVisible = true
            }else if(i == 1) { // 点击退出
                // this.get('user/logout/').then((res) => {
                //     if(res.code == '0') {
                //         this.$message({
                //             showClose: true,
                //             message: '退出成功',
                //             type: 'warning'
                //         });
                //         this.$store.commit('isLogin', false)
                //         localStorage.setItem("isLogin", false)
                //         this.$store.commit('loginPhone', '')
                //         localStorage.setItem("loginPhone", '')
                //         this.$router.push('/')
                //     }else {
                //         this.$message({
                //             showClose: true,
                //             message: '错了哦，退出失败',
                //             type: 'error'
                //         });
                //     }
                // })
            }
        },
        // 发送验证码
        getCodes() {
            let params = {
                cell_phone: this.$store.state.loginPhone
            }
            this.get('user/modify/password/', params).then((res) => {
                if(res.code == '0') {
                    this.hasCode = true
                    this.cut_time()
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        // 倒计时
        cut_time() {
            let that = this
            this.timer = setInterval(() => {
                if(that.countdown > 0) {
                    that.countdown--
                } 
                if(that.countdown <=0){
                    that.hasCode = false
                    that.countdown = 60
                    clearInterval(that.timer)
                }
            }, 1000)
        },
        // 发送修改密码的请求
        modifyPwd() {
            // if(this.$store.state.loginPhone == '') {
            //     this.$message({
            //         showClose: true,
            //         message: '您需要登录之后，才能修改密码',
            //         type: 'error'
            //     });
            //     this.$router.push('/')
            // } else {
            //     this.$refs.form.validate((valid) => {
            //         let params =  {
            //             cell_phone: this.$store.state.loginPhone,
            //             vcode: this.form.vscode,
            //             new_password: this.form.newPwd,
            //         }
            //         console.log(params)
            //         if (valid) {
            //             this.post('user/modify/password/',params).then((res)=>{
            //                 if(res.code == '0') {
            //                     this.$message({
            //                         showClose: true,
            //                         message: '密码修改成功，请重新登录',
            //                         type: 'success'
            //                     });
            //                     this.$store.commit('isLogin', false)
            //                     localStorage.setItem("isLogin", false)
            //                     this.$router.push('/')
            //                 }else if(res.code == '1005') {
            //                     this.$message({
            //                         showClose: true,
            //                         message: '验证码不正确',
            //                         type: 'error'
            //                     });
            //                 }
            //             }).catch((error) => {
            //             // catch 指请求出错的处理
            //                 console.log(error);
            //             })
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     })
            // }
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
    }
}
</script>

<style lang='stylus' scoped>
.head-warp
    height 60px
    line-height 60px
    position fixed
    width 100%
    left 0
    top 0
    z-index 100
    animation-duration 1s
    visibility visible
    opacity 1
    animation MenuAnimIn3 1s ease-in-out
    background #333
    box-shadow 0 0 6px rgba(0,0,0,0.25)
    .nav
        position absolute
        width 100%
        left 50%
        top 0
        height 60px
        transform translate(-50%, 0%)
        transition background-color 500ms ease
        .logo-txt
            font-size 22px
            padding-left 50px
            color #F2F6FC
            font-family "Microsoft YaHei"
            font-weight 500
        .toggle-button
            font-size 48px
            color #fff
            width 50px
            height 60px
            line-height 36px
            text-align center
            cursor pointer
            padding-left 30px
.dropdown
    padding-right 30px

.el-dropdown-link
    cursor pointer
    color #fff
    img
        width 40px
        height 40px
        position relative
        top 10px
        border-radius 10px
.el-icon-arrow-down
    font-size 12px
.btn-fullscreen
    transform rotate(45deg)
    color #fff
    margin-right 5px
    font-size 24px
    position relative
    width 30px
    height 30px
    text-align center
    border-radius 15px
    cursor pointer
    top 5px
</style>