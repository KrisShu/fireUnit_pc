<style lang="less">
.border{
    -webkit-border-image: url("../../assets/image/border.png") 27 round;
    border-image:url("../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
     border-style: solid;
    border-width: 12px 12px;
}
@bgColor:#020d1c;
@hoverBg:#025691;
    #dataPageContainer{
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 12px;
        #baseHeaderContainer{
            height: 75px;
            box-sizing: border-box;
        }
        .el-container{ 
            display: flex;
            flex: 2 0 auto;
            .el-aside{
                background: @bgColor;
                .border();
                .el-menu{
                    background: none;
                    border: none;
                }
            }
            .el-main{
                flex-grow: 1;
                background: @bgColor;
              /*  background: #020d1c; */
                margin-left: 14px;
                height: 100%;
                .border();
            }

        }
    }
</style>
<template>
    <div id="dataPageContainer">
        <base-header></base-header>
        <el-container>
             <el-aside width="220px">
                 <base-aside></base-aside>
             </el-aside>
             <el-main>
                <!-- <el-scrollbar style="height:100%"> -->
                    <router-view></router-view>
                <!-- </el-scrollbar> -->
             </el-main>
       </el-container>
    </div>
</template>

<script>
import baseAside from '../../components/baseAside'
import baseHeader from '../../components/baseHeader'
export default {
    components:{
        baseAside,
        baseHeader
    }

}
</script>


