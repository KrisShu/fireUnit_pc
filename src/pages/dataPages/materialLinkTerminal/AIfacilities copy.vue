<template>
   <div class="AIfacilitiesBox">
       <div class="top">
            <el-button @click="addNew" type="primary" plain>新增</el-button>
       </div>
       <baseTable
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :tableThead="tableThead"
        :tableData="tableData"
        :totalCount='totalCount'
        :isMonitor="true"
        :pageSize="10"
        @showdetails="showdetails"
        @pageChange="prev_next"
        @Monitor='Monitor'
        @deleteInfo='deleteInfo'
       >
       </baseTable>

       <baseDialog width="50%" title="AI分析设施" ref="addDialog">
            <div class="formBox_details">
               <div class="display border deviceSn">
                    <p class="display"><span>设备编号：</span><el-input v-model="sn" placeholder="请输入内容"></el-input></p>
                    <p @click="addmonitor">＋添加监控</p>
               </div>
               <div class="monitorList border">
                   <el-scrollbar style="height:100%">
                        <el-form
                            ref="form"
                            label-width="100px"
                        >
                        <div class="monitorListitem" v-for="(arr,index) in From" :key="index">
                            <div class="monitorSnBox display">
                                <p class="display">
                                    <span class="monitorSn">监控编号：</span>{{arr.sn}}
                                    <span style="margin-left:40px">运行状态:</span> <img src="../../../assets/image/Garydot.png" alt="">
                                </p>
                                <el-link @click="remove(index)" type="primary">移除</el-link>
                            </div>
                            <div class="display" style="margin-bottom:20px">
                                <el-form-item style="flex:2;margin:0" label="RTSP地址：">
                                    <el-input v-model="arr.rtspaddress"></el-input>
                                </el-form-item>
                                <el-link style="margin-left:20px" type="primary">载入</el-link>
                            </div>
                            
                            <el-form-item label="安装位置：">
                                <el-input v-model="arr.rtspaddress"></el-input>
                            </el-form-item>
                            <el-form-item label="具备能力：">
                                <el-radio-group v-model="arr.can">
                                    <el-radio label="室外通道监控"></el-radio>
                                    <el-radio label="室内通道监控"></el-radio>
                                    <el-radio label="明火燃烧"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <div class="specialElformitem" style="margin:20px;padding-left:80px">
                                <el-form-item label="滞留时长：">
                                    <el-input v-model="arr.Retentiontime"></el-input>
                                    <span>分</span>
                                </el-form-item>
                                <el-form-item label="安装位置：">
                                    <el-input v-model="arr.Confidence"></el-input>
                                    <span>%</span>
                                </el-form-item>
                            </div>
                        </div>
                        </el-form>
                   </el-scrollbar>
               </div>
            </div>  
       </baseDialog>

       <!-- 监控步数弹窗 -->
       <baseDialog width="40%" title="监控路数" ref="monitorDialog">
      
            <el-form class="formBox" ref="form" :model="monitorFrom" label-width="100px">
                <el-scrollbar style="height:80%;width:100%">
                    <p class="tips">各路摄像头监控地址：</p>
                    <el-form-item  
                        v-for="(arr,index) in monitorFrom.cn" 
                        :key="index" 
                        :label="arr.sn + '路：'"
                        prop="sn"
                    >
                        <el-input  v-model="arr.location" placeholder="请输入监控地址"></el-input>
                    </el-form-item>
                    
                </el-scrollbar>
                <el-row  class="btns" :gutter="20">
                    <el-button @click="submit_monitor">提交</el-button>
                    <el-button class="cancel" @click="cancel_monitor">取消</el-button>
                </el-row>
            </el-form>
        
       </baseDialog>
            
    </div>
</template>

<script>
import baseTable from '../../../components/baseTable/index'
import baseDialog from '../../../components/baseDialog/index'
export default {
    components:{
        baseTable,
        baseDialog
    },
    data(){
        return{
            loading:false,
            tableThead:[
                {
                    name:'设施编号',
                    prop:'sn',
                },
                {
                    name:'最大监控路数',
                    prop:'monitorNum',
                },
                {
                    name:'操作',
                   
                },
            ],
            tableData:[],
            totalCount:0,
            page:{
                fireUnitId :localStorage.getItem('fireUnitID'),
                SkipCount:0,
                MaxResultCount:10
            },
            monitorFrom:{
                cn:'',
            },
            monitorFrom2:{
                sn:'',
            },

            sn:'',
            From:[
                {
                    sn:'1路',
                    state:false,
                    rtspaddress:'',
                    installaddress:'',
                    can:'室外通道监控',
                    Retentiontime:'5',
                    Confidence:'90'
                },
            ]
           




        }
    },
    created(){
        this.GetVisionDeviceList();
    },
    methods:{
        GetVisionDeviceList(){
            this.$axios.get(this.$api.GetVisionDeviceList,{params:this.page}).then(res=>{
                console.log("res",res);
                ({totalCount:this.totalCount,items:this.tableData}= res.data.result)
                if(res.data.result.items.length == 0 && res.data.result.totalCount>0){
                    this.page.SkipCount = 0;
                    this.GetVisionDeviceList();
                }
                
            }).catch(err=>{
                console.log("err",err)
            })
        },  
        addNew(){
            this.$refs.addDialog.dialogVisible = true
            this.AIform = {}
            this.$set(this.AIform,'smsPhones',localStorage.getItem('contractPhone'))
        },
        showdetails(items){
            console.log("获取详情",items)
            this.$refs.addDialog.dialogVisible = true
        },
        remove(index){
            this.From.splice(index,1)
        },
        prev_next(page){
            this.page.SkipCount = (page-1)*this.page.MaxResultCount
            this.GetVisionDeviceList();
        },
        Monitor(items){
            // monitorDialog
            console.log("Monitor",items)
            this.$refs.monitorDialog.dialogVisible = true
            this.$axios.get(this.$api.GetVisionDetectorList,{params:{visionDeviceId:items.id}}).then(res=>{
                console.log("获取监控步数",res)
                let cn = JSON.stringify( res.data.result )

                this.monitorFrom.cn = JSON.parse(cn)
                this.monitorFrom2.sn =JSON.parse(cn) 
            })
        },
        submit_monitor(){
            console.log(this.monitorFrom.cn[0])
            this.$axios.put(this.$api.UpdateVisionDetectorList,this.monitorFrom.cn).then(res=>{
                    //  console.log("成功",res)
                    this.$refs.monitorDialog.dialogVisible = false
                 }).catch(err=>{
                     console.log("失败",err)

                 })
           
        },
        cancel_monitor(){
            console.log(this.monitorFrom2.sn)
            let a = JSON.stringify(this.monitorFrom2)
            this.monitorFrom.cn = JSON.parse(a).sn
        },
        deleteInfo(items){
            this.$axios.delete(this.$api.DeleteVisionDevice,{params:{id:items.id}}).then(res=>{
                this.$message({
                    message: '删除数据成功',
                    type: 'success'
                });
                this.GetVisionDeviceList();
            }).catch((err)=>{
                 this.$message({
                    message: '删除数据失败',
                    type: 'error'
                });
            })

        },
        addmonitor(){
           
            let formLength = this.From.length;
            formLength++;
            console.log("新增",formLength)
            let monitorItem ={
                 sn:`${formLength}路`,
                state:false,
                rtspaddress:'',
                installaddress:'',
                can:'室外通道监控',
                Retentiontime:'5',
                Confidence:'90'
            }
            this.From.push(monitorItem)
        }

    }
}
</script>

<style lang="less">

    .AIfacilitiesBox{
        .top{
            display: flex;
            justify-content: flex-end;
            .el-button{
                width: 200px;
                background: #025691;
                border-color: #025691;
                color: white;
            }
        }
        .el-dialog{
            
            .el-dialog__body{
                display: flex;
                justify-content: center;
                height: 600px;
                .formBox_details{
                    width: 100%;
                    padding: 20px;
                    .display{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .border{
                        border: 1px dotted white;
                        border-radius: 4px;
                        padding: 10px;
                    }
                    .deviceSn{
                        color: white;
                        p{
                            cursor: pointer;
                            span{
                                display: inline-block;
                                width: 100px;
                            }
                            .el-input__inner{
                                background: #025691;
                                color: white;
                            }
                            input::placeholder{
                                color: #999898;
                            }
                        }
                    }
                    .monitorList{
                        height: 86%;
                        .el-scrollbar__wrap{
                            overflow-x: hidden;
                            .monitorListitem{
                                padding-bottom: 20px;
                                border-bottom: 1px dotted white;

                                .monitorSnBox{
                                    margin-bottom: 16px;
                                    color: #fff;
                                    span.monitorSn{
                                        display: inline-block;
                                        width: 100px;
                                        text-align: right;
                                        box-sizing: border-box;
                                        padding-right: 12px;
                                    }
                                }
                                .el-form-item{
                                    .el-form-item__label{
                                        color: white;
                                    }
                                    
                                    .el-input__inner{
                                            background: #025691;
                                            color: white;
                                        }
                                    input::placeholder{
                                        color: #999898;
                                    }
                                }
                                .specialElformitem{
                                        .el-form-item__content{
                                            display: flex;
                                            width: 100px;
                                        }
                                        span{
                                            margin-left: 10px;
                                        }
                                }
                            }
                        }
                    }
                }
                
                .formBox{
                    width: 56%;
                    max-height: 480px;
                    padding: 20px;
                    border: 1px solid darkblue;
                    box-shadow: 0 2px 12px 0 #29d;
                    &.formBoxadd{
                        height:260px ;
                        // box-sizing: border-box;
                        padding: 50px;
                    }
                    .el-scrollbar__wrap{
                        overflow-x: hidden;
                        padding: 20px;
                        padding-bottom: 0px;
                    }

                    .tips{
                        color: #dfdddd;
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                    .el-form-item__label{
                        color: white;
                    }
                    .el-input__inner{
                        background: #025691;
                        color: white;
                    }
                    input::placeholder{
                        color: #999898;
                    }
                    .btns{
                        margin-top: 50px;
                        margin-bottom: 40px;
                        .el-button{
                            
                            width: 48%;
                            background: #025691;
                            color: #cccccc;
                            &.cancel{
                                background: #04243b;
                                color: #cccccc;
                            }
                        }
                    }
                }
            }
           
        }
       
    }
</style>