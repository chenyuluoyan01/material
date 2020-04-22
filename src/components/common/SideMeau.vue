<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="$store.state.isCollapse" :default-active = "activeMenu" router>
            <el-submenu index="1">
                <template slot="title" >
                    <i class="el-icon-location"></i>
                    <span slot="title">物料库</span>
                </template>
                <template v-for="(item, index) in nav_menu_data">
                    <el-menu-item :index = "item.path" :key = "index">
                        {{item.title}}
                    </el-menu-item>
                </template>
            </el-submenu>
            <!-- <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人信息</span>    
                </template>
                <template v-for="(item, index) in nav_menu_error">
                    <el-menu-item :index = "item.path" :key = "index">
                        {{item.title}}
                    </el-menu-item>
                </template>
            </el-submenu> -->
        </el-menu>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            activeMenu: '/Classify',
            nav_menu_data: [{
                title: '分类管理',
                path: '/Classify',
            },{
                title: '物资管理',
                path: '/Material',
            },{
                title: '品牌管理',
                path: '/Brand',
            },{
                title: '供应商管理',
                path: '/Supplier',
            }],
        }
    },
    watch: { // 路由监听：监听路由的变化，从而做出相应操作
        $route: {
            immediate: true, // 一旦监听到路由的变化立即执行
            handler(to,from) {
                this.activeMenu = to.path // 给activeMenu重新赋值为当前组件的路由地址           
            },
            deep: true,
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    }
}
</script>

<style lang='stylus' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse)
    width 200px
    height 100%
    min-height 400px
.sidebar
    display block
    position absolute
    left 0
    top 60px
    bottom 0
    overflow-y scroll
.sidebar::-webkit-scrollbar
    width 0
.sidebar-el-menu:not(.el-menu--collapse)
    width 250px
.el-menu--collapse
    width 64px
    height 100%
</style>