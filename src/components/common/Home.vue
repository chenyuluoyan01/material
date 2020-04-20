<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-meau></v-meau>
        <div class="r-container">
            <div class="content">
                <keep-alive>
                    <router-view class="menu-right animated fadeInLeft"/>
                </keep-alive>
                
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header'
import vMeau from './SideMeau'
export default {
    components: {
        vHead,
        vMeau
    },
    data() { 
        return {
            
        }
    }
}
</script>

<style lang='stylus' scoped>
.r-container
    position absolute
    height 100%
    left 200px
    right 0
    top 60px
    background #f0f0f0
    .content
        width 100%
        height  'calc(100vh - %s)' % 60px
        padding 15px
        padding-bottom 30px
        overflow-y scroll
        box-sizing border-box
</style>