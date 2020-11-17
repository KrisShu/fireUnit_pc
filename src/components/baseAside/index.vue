<style lang="less">
@hoverBg:#025691;
#asideMenu{
  height: 100%;
  overflow: hidden;
  /* .tac{
    height: 100%;
    .el-col{
      height: 100%;
      .el-menu-vertical-demo{
        height: 100%;
      }
    }
    
  } */

  .el-menu-item{
        padding: 0px;
        height: 62px;
        line-height: 62px;
        span{
            color: #fff;
            font-size: 16px;
        }
        &.is-active {
          background-color:@hoverBg !important;
        }
        &:hover{
            background: @hoverBg;
        }
        &:focus{
            background: @hoverBg;
        }
        .el-icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 18px;
            
        }
        
  }
  
  .el-submenu__title{
    &:hover{
      background: @hoverBg;
    }
    span{
      color: #fff;
      font-size: 16px;
      margin-left: 18px;
    }
  }
 
    .el-submenu .el-menu-item{
      min-width: 160px;
      color: white;
      font-size: 14px;
    }

  
}
</style>

<template>
  <div id="asideMenu">
    <el-scrollbar style="height:100%">
      <el-row class="tac">
        <el-col :span="24">
          <!-- 隐患及警情 -->
          <el-menu 
            @select="changePath" 
            :unique-opened="true" 
            :default-active="menuActive" 
            class="el-menu-vertical-demo"  
          >
            <el-submenu index="hiddendanger">
              <template slot="title">
                <img :src="fiveIcon" alt="">
                <span>隐患及警情</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,x) in hiddendanger[0].childMenuList" :key="x" :index="item.url">{{item.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!--  -->
            <el-menu-item v-for="(arr,i) in menuList" :key="i" :index="arr.url">
                  <img class="el-icon" :src="arr.icon" alt="">
                  <span slot="title">{{arr.name}}</span>
            </el-menu-item>
            <!-- 消防设施 -->
            <el-submenu index="materialLinkTerminal">
              <template slot="title">
                <img :src="threeIcon" alt="">
                <span>消防设施</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,x) in materialLinkTerminal[0].childMenuList" :key="x" :index="item.url">{{item.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 数据报告 -->
            <el-menu-item index="datareport">
                  <img class="el-icon" :src="datareport" alt="">
                  <span slot="title">数据报告</span>
            </el-menu-item>
            <!--单位信息  -->
            <el-submenu index="unitInformation">
              <template slot="title">
                <img :src="sevenIcon" alt="">
                <span>单位信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,x) in unitInformation[0].childMenuList" :key="x" :index="item.url">{{item.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import oneIcon from '../../assets/image/index/xfjq__img_01.png'
import twoIcon from '../../assets/image/index/xfjq__img_02.png'
import threeIcon from '../../assets/image/index/xfjq__img_03.png'
import fourIcon from '../../assets/image/index/xfjq__img_04.png'
import fiveIcon from '../../assets/image/index/xfjq__img_05.png'
import sixIcon from '../../assets/image/index/xfjq__img_06.png'
import sevenIcon from '../../assets/image/index/xfjq__img_07.png'
import datareport from '../../assets/image/index/datareport.png'
export default {
  data(){
    return{
      sevenIcon,
      threeIcon,
      fiveIcon,
      datareport,
      menuActive:'fireWarning',
      menuList:[
        {
          url:'facilityFailure',
          name:'设施故障',
          icon:oneIcon
        },
        {
          url:'dutyRecord',
          name:'值班记录',
           icon:twoIcon
        },
        {
          url:'inspectionRecords',
          name:'巡查记录',
          icon:fourIcon
        },
        
      /*   {
          url:'iframe',
          name:'嵌套网页',
          icon:sixIcon
        }, */
        
      ],
      hiddendanger:[
        {
          name:'隐患及警情',
          icon:fiveIcon,
          childMenuList:[
            {
              url:'fireWarning',
              name:'火警联网',
            },
            {
              url:'hiddeElectric',
              name:'电气火灾',
            },
            {
              url:'AIAnalysis',
              name:'AI智能分析仪',
            },
            {
              url:'hiddenPipe',
              name:'消防管网',
            }
            
          ]

        }
      ],
      materialLinkTerminal:[
        {
          name:'消防设施',
          icon:threeIcon,
          childMenuList:[
            {
              url:'firenetworking',
              name:'火警联网设施',
            },
            {
              url:'electricalFire',
              name:'电气火灾设施',
            },
            {
              url:'IndependentSmokesense',
              name:'独立式火警设施',
            },
            {
              url:'AIfacilities',
              name:'AI智能分析仪',
            },
            {
              url:'pipeNetwork',
              name:'消防管网设施',
            },
            {
              url:'otherFacilities',
              name:'其它消防设施',
            }

          ]

        }
        

      ],
      unitInformation:[
         {
          name:'单位信息',
          icon:sevenIcon,
          childMenuList:[
            {
              url:'baseInformation',
              name:'基本信息',
            },
            {
              url:'ArchitectureInformation',
              name:'建筑信息',
            },
            {
              url:'firePractitioners',
              name:'消防从业人员',
            },
            {
              url:'firePreventionPlan',
              name:'消防预案',
            },
            {
              url:'minFirestation',
              name:'微型消防站',
            },
          ]
        },
      ]
    }
    
  },
  methods:{
    /* 菜单跳转 */
    changePath(index){
      console.log(index)
      this.$router.push({
        name:index
      })
    }
  },
  created: function() {
    this.menuActive = this.$route.name;
  },
};
</script>


