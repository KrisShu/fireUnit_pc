<template>
  <div class="ArchitectureInformationBox">
    <el-row  
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :gutter="18"
    >
        <!-- 左边 -->
        <el-col :span="6">
            <div class="left_box">
                <div class="button_Box_adddelete">
                    <el-button v-if="!isshowRight" @click="addNewArchitecture">新增建筑</el-button>
                </div>
                <!--  -->
                <div class="treeNode" v-if="ishavebuild">
                    <el-tree
                        ref="vuetree"
                        :data="data"
                        :props="defaultProps"
                        accordion
                        highlight-current
                        node-key="id"
                        @node-click="handleNodeClick">
                        
                    </el-tree>
                </div>

            </div>
        </el-col>
      <!-- 右边 -->
        <el-col :span="18">
            <!-- 新增 -->
            <div class="right_box" v-if="isbuild">
                    <BaserightForm @cancel="cancel" v-if="isshowRight"  @deletebuild="deletebuild" :isadd="true" v-model="facilitiesForm"></BaserightForm>
                    <BaserightForm @cancel="cancel" v-if="isshowRight2"  @deletebuild="deletebuild" v-model="facilitiesForm"></BaserightForm>
            </div>
            <div class="right_box" v-if="!isbuild">
                <BaseRightFloor :floorinformation_id="floorinformation_id" v-model="floorinformation"></BaseRightFloor>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>

import BaserightForm from './BaserightForm'
import BaseRightFloor from './baseRightFloor'
export default {
  components: {
    BaserightForm,
    BaseRightFloor
  },
    data() {
        return {
            loading:false,
            is:true,
            data:[], 
            //控制   
            defaultProps: {
                children: 'floors',
                label: 'name'
            },    
            isshowRight:false,
            isbuild:true,
            isshowRight2:false,
            ishavebuild:false,
            facilitiesForm1:{
                fireUnitId:'',//所属防火单位
                aboveNum:1,
                belowNum:0,
                buildYear:0,
                area:0,
                height:0,
                // ----------------------
                fireDevice_LTJ_Detail:{},
                fireDevice_HJ_Detail:{
                    callpoliceWay:[],
                },//报警系统
                fireDevice_MH_Detail:{
                    forms:[]
                },//灭火形式
                fireDevice_TFPY_Detail:{},//通风
                fireDevice_XHS_Detail:{},//消火栓
                fireDevice_XFSY_Detail:{
                    checkbox:[]
                }
            },
            facilitiesForm:{},
            floorinformation_id:'',//楼层信息
            floorinformation:'',
            floor_pic:'',//楼层图片

        };
    },
    created(){
        this.GetListByFireUnitId();
        this.facilitiesForm1.fireUnitId = localStorage.getItem('fireUnitID')
        this.facilitiesForm.fireUnitId = localStorage.getItem('fireUnitID')
    },

    methods:{
        GetListByFireUnitId(){
            this.loading= true;
            let fireunitId = localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetListByFireUnitId,{params:{fireunitId}}).then(res=>{
                console.log("获取总体建筑信息",res)
                this.loading= false;
                if(res.data.result.length>0){
                    this.isshowRight2 = true
                    this.ishavebuild = true
                    this.isbuild = true
                    this.isshowRight = false
                    this.data = res.data.result
                
                    this.$nextTick(()=>{
                        this.$refs.vuetree.setCurrentKey(res.data.result[0].id);
                    })
                    this.ArchitectureGetById(res.data.result[0].id)
                
                }else{
                    console.log("没有数据")
                    //零条建筑时什么都不显示，且清空右边form为空
                    this.isshowRight =false
                    this.isshowRight2 = false
                    this.ishavebuild = false
                }
            }).catch(err=>{
                console.log("获取总体建筑信息失败",err)
            })
        },
        //获取某个建筑的具体信息
        ArchitectureGetById(id){
            console.log("某建筑的id",id)
            this.$axios.get(this.$api.ArchitectureGetById,{params:{id}}).then(res=>{
                console.log('获取某建筑的具体信息',res)
                let form = res.data.result;
                form.fireDevice_LTJ_Exist ? form.fireDevice_LTJ_Detail = JSON.parse(form.fireDevice_LTJ_Detail) :  form.fireDevice_LTJ_Detail ={}
                form.fireDevice_HJ_Exist ? form.fireDevice_HJ_Detail = JSON.parse(form.fireDevice_HJ_Detail) :  form.fireDevice_HJ_Detail ={callpoliceWay:[]}
                form.fireDevice_MH_Exist ? form.fireDevice_MH_Detail = JSON.parse(form.fireDevice_MH_Detail) :  form.fireDevice_MH_Detail ={ forms:[]}
                form.fireDevice_TFPY_Exist ? form.fireDevice_TFPY_Detail = JSON.parse(form.fireDevice_TFPY_Detail) :  form.fireDevice_TFPY_Detail ={}
                form.fireDevice_XHS_Exist ? form.fireDevice_XHS_Detail = JSON.parse(form.fireDevice_XHS_Detail) :  form.fireDevice_XHS_Detail ={}
                form.fireDevice_XFSY_Exist ? form.fireDevice_XFSY_Detail = JSON.parse(form.fireDevice_XFSY_Detail) :  form.fireDevice_XFSY_Detail ={ checkbox:[]}
                console.log("转换后的form",form)
                let formstring = JSON.stringify(form)
                this.facilitiesForm = JSON.parse(formstring)
            }).catch(err=>{
                console.log('获取某建筑的具体信息失败',err)
            })
        },
        //
        deletebuild(){
            this.GetListByFireUnitId()
        },
        cancel(isadd,id){
            console.log(isadd)
            if(isadd){//如果是新增建筑
                console.log("quxiao")
                this.GetListByFireUnitId();
            }else{//如果不是新增建筑
                this.ArchitectureGetById(id)
            }
        },
        // 选择建筑或楼层
        handleNodeClick(data) {
            console.log(data);
            if(data.floors){
                console.log("这是总体建筑节点")
                this.ArchitectureGetById(data.id)
                this.isbuild = true
            }else{
                console.log("这是建筑下的楼层节点")

                this.isbuild =false
                this.floor_pic = data.floor_Picture
                this.floorinformation_id = data.id
                this.floorinformation = data

            }
        },
        handleChange(){

        },
        //新增建筑按钮
        addNewArchitecture(){
            this.isshowRight = true
            this.isbuild = true
            this.ishavebuild = false
            this.isshowRight2 = false
            let stringform = JSON.stringify( this.facilitiesForm1)
            this.facilitiesForm = JSON.parse(stringform)
            //取消选中节点
            console.log(this.$refs.vuetree)

            // this.$refs.vuetree.setCurrentKey('');

        },
        
        
    }
  
};
</script>

<style lang="less">
.ArchitectureInformationBox {
    .left_box {
        .button_Box_adddelete{
            &>.el-button{
                width: 200px;
                background: #093169;
                color: white;
                &.delete{
                    margin: 0;
                    margin-top: 40px;
                }
            }
        }
        //----------------------------
        .treeNode{
            margin-top: 40px;
            width: 200px;
        
            .el-tree{
                background: #093169;
                border-radius: 8px;
                border: 1px solid white;
                padding: 10px;
                .el-tree-node {
                    padding: 10px;
                }
                .el-tree-node__label{
                    color: white;
                }
                .el-tree-node__content:hover{
                   .el-tree-node__label{
                     color: #093169;
                    } 
                }
                
            }
            .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
                border-radius: 2px;
                .el-tree-node__label{
                    color: #093169;
                }
            }
            
            
           
        }
        
    }
  .right_box {
    
  }
}
</style>