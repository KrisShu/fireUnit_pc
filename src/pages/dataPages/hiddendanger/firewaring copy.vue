<style lang="less">
@fontColor:#abd5ff;
@bgColor:#072041;
.border_dialog{
    border-image:url("../../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
    border-style: solid;
    border-width: 24px 24px;
}
.fireWarning{
    color: #fff;
     overflow: hidden;
   
    /*  */
    .changeStatus{
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        color: @fontColor;
        align-items: center;
        .el-checkbox.is-checked{
            .el-checkbox__input.is-checked{
                .el-checkbox__inner{
                    &::after{
                         border: 2px solid white;
                        -webkit-box-sizing: content-box;
                        box-sizing: content-box;
                        content: "";
                        border-left: 0;
                        border-top: 0;
                        height: 7px;
                        left: 4px;
                        position: absolute;
                        top: 1px;
                        width: 3px;
                        -webkit-transform: rotate(45deg) scaleY(1);
                        transform: rotate(45deg) scaleY(1);
                        }
                }
            }
        }

        .el-checkbox-group{
            .el-checkbox__inner{
                background-color: #163f72;
                border: solid 1px #82b3f0;
                
            }
            .el-checkbox__label{
                font-size: 14px;
                color: @fontColor;
            }
        }
    }
    /*  */
    .tableBox{
        margin-top: 16px;
        border-right: 1px solid #025691;
        border-left: 1px solid #025691;
        .el-table tr{
            background: transparent ;
        }
        .el-table td{
            border-bottom: 1px solid #025691;
        }
        .el-table th.is-leaf{
            border-bottom: 1px solid #025691;
        }
        .el-table--enable-row-hover .el-table__body tr:hover>td{
            background-color: #10315b;
        }
        .el-table::before{
            height: 0px;
        }
        .el-table .cell{
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .el-table__header-wrapper{
            .has-gutter{
               
                color: #a2ecff;
                tr{
                   th{
                       background: #1d477b !important;
                   }
                }
            }
           
        }
        .el-table__row{
            height: 60px;
            background: @bgColor !important;
        /*    background: #00060e  !important; */
             td{
                 padding: 0px;
                .cell{
                    color: #fff;
                    font-size: 14px;
                    .el-button{
                        background: none;
                        border: none;
                        &.yellow{
                            color: #f7ff19;
                        }
                        &.normal{
                            color: #7598c2;
                        }
                        &.lightBlue{
                            color: rgb(116, 220, 255);
                        }
                    }
                }
            }
        }
        /* 暂无数据 */
        .el-table__empty-block{
            background: #025691;
            .el-table__empty-text{
                color: white;
            }
            
        }
    }
    /* 分页 */
    .pagenationBox{
        width: 100%;
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
            .el-pagination__total{
                font-size: 12px;
                color: #bee3fd;
            }
            .el-pagination.is-background .btn-prev{
                display: inline-block;
                width: 47px;
                height: 28px;
                background-color: #146ca9;
                color: #bee3fd;
            }
            .el-pagination.is-background .btn-next{
                display: inline-block;
                width: 47px;
                height: 28px;
                background-color: #146ca9;
                color: #bee3fd;
            }
            .el-pagination.is-background .el-pager li{
               border: solid 1px #146ca9;
               background: #146ca9;
               color: #fff;
            }
            .el-pager li.active{
            border: solid 1px #146ca9;
               background: @bgColor !important; 
               color: #fff;
            }
     
    }

    /* 弹窗 */
    .el-dialog{
        width: 1000px;
        height: 538px;
        .border_dialog();
        position: relative;
        background: @bgColor;
        .el-dialog__headerbtn .el-dialog__close{
            display: inline-block;
            width: 50px;
            height: 50px;
            color: transparent;
            background: url("../../../assets/image/home/dialog_btn_close.png");
            position: absolute;
            top: -50px;
            right: -50px;
        }
        .el-dialog__header{
            height: 70px;
            padding: 0px;
            background: url("../../../assets/image/home/dialog_bg.png") no-repeat;
            background-position: center center;
            .el-dialog__title{
                color: #fefefe;
                font-size: 22px;
                line-height: 70px;
                text-align: center;
                width: 100%;
                display: inline-block;
            }
        }
        .el-dialog__body{
                padding: 0px;
                display: flex;
                height: 418px;
                .dialog_content{
                    padding-left: 100px;
                    width: 800px;
                    .p-box{
                        line-height: 2.5;
                        color: #fefefe;
                        font-size: 14px;
                        &:last-of-type{
                            margin-top: 30px;
                        }
                        .span-box-left{
                            width: 80px;
                            display: inline-block;
                            text-align: right;

                            margin-right: 14px;
                            
                        }
                    }
                    .vioceUrl{
                        width: 100px;
                        height: 30px;
                        border-radius: 8px;
                       background-color: #6ff255;
                       display: flex;
                       align-items: center;
                       padding-left: 20px;
                       img{
                           width: 20px;
                           height: 20px;
                       }
                       span{
                        font-size: 16px;
                        color: #262626;
                        cursor: pointer;
                       }
                    }
                    .img-box{
                        display: flex;
                        margin-top: 36px;
                        img{
                            width: 170px;
                            height: 110px;
                            &:nth-of-type(2){
                                margin: 0 22px;
                            }
                        }
                    }
                }
                .dialog_content2{
                   padding: 20px;
                   display: flex;
                   width: 100%;
                    .bg{
                            background: #455b8f;  
                            background: linear-gradient(to right,#455b8f, #182848 );
                            border-radius: 4px;
                            border: 1px solid #1d3561;
                            width: 50%;
                            height: 100%;
                    }
                    .top{
                            height: 40px;
                            border-bottom: 1px solid #1d3561;
                            background: #4b6cb7;  
                            background: linear-gradient(to right,#4b6cb7, #182848 );

                    }
                    .left{
                        
                        margin-right: 10px;
                        ul{
                            width: 100%;
                            height: 80%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-around;
                            li{
                                color: white;
                               .li_title{
                                    display: inline-block;
                                    width: 100px;
                                    text-align: right;
                                }
                                .li_content{
                                    display: inline-block;
                                    width: 200px;
                                }

                            }
                        }
                       


                    }
                    .right{
                        .pd{
                            padding: 40px;
                            
                        }
                        .nuclearpoliceForm{
                            height: 60%;
                            padding: 10px;
                            background: #072041;
                            .el-radio-group{
                                margin: 10px 0px;
                                .el-radio{
                                    color: white;
                                    .el-radio__label{
                                         font-size: 18px;
                                    }
                                }
                            }
                            .truePolice{
                                margin: 10px 0px;
                                .el-checkbox{
                                    .el-checkbox__label{
                                        color: white;
                                    }
                                    .el-checkbox__input.is-checked+.el-checkbox__label{
                                        color: #00baff;
                                    }
                                }
                            }
                            p{
                                line-height: 3;
                                color: white;
                            }
                            .el-textarea__inner{
                                background: #385093;
                                height: 100px;
                                border: none;
                                color: white;

                            }
                            .el-button{
                                background: url('../../../assets/image/home/dialog_btn_bg.png') repeat;
                                width: 100%;
                                margin-top: 10px;
                                border: none;
                                color: white;
                            }
                        }
                    }

                }
                
        }
    }
}

</style>
<template>
    <div class="fireWarning">
        <div class="changeStatus">
            <span>核警状态：</span>
            <el-checkbox-group v-model="form.type">
                <el-checkbox @change="screenData" label="未核警" name="type"></el-checkbox>
                <el-checkbox @change="screenData" label="误报" name="type"></el-checkbox>
                <el-checkbox @change="screenData" label="测试" name="type"></el-checkbox>
                <el-checkbox @change="screenData" label="真实火警" name="type"></el-checkbox>
                <el-checkbox @change="screenData" label="已过期" name="type"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="tableBox">
            <el-table :data="tableData"  style="width: 100%">
                <el-table-column label="时间">
                     <template slot-scope="scope">
                        <span>{{ scope.row.creationTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="消防主机"> 
                     <template slot-scope="scope">
                        <span>{{ scope.row.gatewaySn}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="部件地址"> 
                     <template slot-scope="scope">
                        <span>{{ scope.row.location}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="部件类型"> 
                     <template slot-scope="scope">
                        <span>{{ scope.row.detectorTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="位置"> 
                     <template slot-scope="scope">
                        <span>{{ scope.row.location}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="核警">
                     <template slot-scope="scope">
                         <el-button @click="dialog(scope.row.checkState,scope.row.fireAlarmId)" :class="handStaus(scope.row.checkState)">
                            <span v-if="scope.row.checkState == 1">核警 </span>
                            <span v-if="scope.row.checkState == 2">误报 </span>
                            <span v-if="scope.row.checkState == 3">测试 </span>
                            <span v-if="scope.row.checkState == 4">真实火警 </span>
                            <span v-if="scope.row.checkState == 5">已过期 </span>
                         </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagenationBox">
            <el-pagination  prev-text="上一页" next-text="下一页" hide-on-single-page @prev-click="prevClick" @next-click="nextClick" @current-change="currentChange" background layout="total,prev, pager, next" :total="totalCount"></el-pagination>
        </div>



        <!-- 弹窗-已核警 -->

         <!-- 弹窗2 -->
        <el-dialog  title="消防警情核警情况" :visible.sync="dialogVisible">
            <div class="dialog_content">
                <p class="p-box">
                    <span class="span-box-left">时间：</span>
                    <span class="span-box">{{dealData.creationTime}}</span>
                </p>
                <p class="p-box">
                    <span class="span-box-left">部件类型：</span>
                    <span class="span-box">{{dealData.detectorTypeName}}</span>
                </p>
                <p class="p-box">
                    <span class="span-box-left">位置：</span>
                    <span class="span-box">{{dealData.location}}</span>
                </p>
                <p class="p-box">
                    <span class="span-box-left">核警情况：</span>
                    <span class="span-box" >{{dealData.checkState}}</span>
                </p>
                <p class="p-box" v-if="dealData.checkState == 3"> 
                    <span class="span-box-left">警情通知：</span>
                    <span class="span-box"> 
                        <i v-if="dealData.notify119"> 通知119 、</i>
                        <i v-if="dealData.notifyMiniaturefire"> 通知微型消防站 、</i>
                        <i v-if="dealData.notifyWorker">通知工作人员 </i>
                    </span>
                </p>
                <p class="p-box name-time">
                    <span class="span-box-left">核警人员：</span>
                    {{dealData.fireCheckUser}}
                </p>
                <p class="p-box">
                    <span class="span-box-left">核警说明：</span>
                    {{dealData.content}}
                </p>
                 <div class="vioceUrl"  @click="playVioce(dealData.vioceUrl)" v-if="dealData.vioceUrl">
                    <img src="../../../assets/image/index/voice.png" alt="">
                    <span>{{dealData.voiceLength}}"</span>
                </div>
            </div>
        </el-dialog>

       
         <!-- 弹窗-核警 -->

        <el-dialog   title="消防警情核警" :visible.sync="dialogVisible2">
            <div class="dialog_content2">
                <div class="left bg">
                    <p class="top"></p>
                    <ul>
                        <li>
                            <span class="li_title">时间：</span>
                            <span class="li_content">{{dealData.creationTime}}</span>
                        </li>
                       
                        <li>
                            <span class="li_title">部件地址：</span>
                            <span class="li_content">{{dealData.detectorSn}}</span>
                        </li>
                        <li>
                            <span class="li_title">部件类型：</span>
                            <span class="li_content">{{dealData.detectorTypeName}}</span>
                        </li>
                        <li>
                            <span class="li_title">部件位置：</span>
                            <span class="li_content">{{dealData.location}}</span>
                        </li>
                        <li>
                            <span class="li_title">消防联系人：</span>
                            <span class="li_content">{{dealData.fireContractUser}}</span>
                        </li>
                    </ul>
                </div>
                <div class="right bg">
                    <p class="top"></p>
                    <div class="pd">
                        <el-form class="nuclearpoliceForm" ref="form" :model="nuclearpoliceForm" label-width="80px">
                            <el-radio-group v-model="nuclearpoliceForm.CheckStatestirg ">
                                <el-radio label="误报">误报</el-radio>
                                <el-radio label="测试">测试</el-radio>
                                <el-radio label="真实火警">真实火警</el-radio>
                            </el-radio-group>
                            <div class="truePolice" v-if="nuclearpoliceForm.CheckStatestirg == '真实火警'">
                                <el-checkbox-group v-model="nuclearpoliceForm.NotifyList">
                                    <el-checkbox label="通知工作人员"></el-checkbox>
                                    <el-checkbox label="通知微型消防站"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <p>情况说明：</p>
                            <el-input type="textarea" placeholder="情况简要描述，200字以内" v-model="nuclearpoliceForm.CheckContent"></el-input>
                            <el-button @click="onSubmitNuclearPolice(dealData.fireAlarmId)">提交</el-button>
                        </el-form>
                        
                    </div>
                    
                </div>
            </div>
            
        </el-dialog>


    </div>
</template>
<script>
import { error } from 'util'
let FireUnitId = localStorage.getItem('fireUnitID')
/* import BenzAMRRecorder  from 'benz-amr-recorder' */
export default {
    data(){
        return{
            form: {
                type: ['未核警','误报','测试','真实火警','已过期'],
            },
            /* 核警form */
            nuclearpoliceForm:{
               CheckStatestirg:'误报',
               NotifyList: ['通知工作人员']
            },
            tableData: [],
            dialogVisible:false,
            dialogVisible2:false,
            MaxResultCount:10,
            SkipCount:0,
            totalCount:0,//数据总共条数
            dealData:[],//待处理数据
            amr:'',//amr播放对象
            Duration:0,//语音时长
            mediaStreamTrack:'',
            CheckId:0,//核警id   
            currentPage:1,//当前页
            

        }
    },
    methods:{
        //筛选数据
        screenData(){
            console.log("form",this.form)
            let CheckStates =  this.form.type.join(',')
            this.tableDataMethod(this.currentPage,CheckStates)
        },
        /* 播放语音 */
        playVioce(){
            this.amr.play();
            this.amr.onEnded(function() {
               console.log("播放完毕")
            })
        },
        /* 弹窗 */
        dialog(status,id){
            console.log("状态status",status);
            if(status ==5){
                this.dialogVisible = false
            }else if(status == 1){
                this.dialogVisible2 = true;
                this.GetFireAlarmById(id)

            }else{
                this.dialogVisible = true;
                this.GetFireAlarmById(id)
            }
            
        },
         GetFireAlarmById(fireAlarmId){
            this.$axios.get(this.$api.GetFireAlarmById,{params:{fireAlarmId}}).then(res=>{
                console.log("获取某一条火警数据详情",res)
                this.dealData = res.data.result
                this.dealData.creationTime = this.delTime(this.dealData.creationTime)
            }).catch(err=>{
                console.log("err",err)
            })
        },
        //获取火警联网数据列表
        tableDataMethod(dataPage,CheckStates='未核警,误报,测试,真实火警,已过期'){//缺少分页的字段和筛选的字段
            this.$axios.get(this.$api.GetFireAlarmList,
            {params:{FireUnitId, 
                    MaxResultCount:this.MaxResultCount, 
                    SkipCount:(dataPage-1)*this.MaxResultCount,
                    CheckStates}
            }).then(res=>{
                console.log("获取火警联网数据列表",res);
                ({items:this.tableData,totalCount:this.totalCount}=res.data.result);
                for(let arr of this.tableData){
                     arr.creationTime = this.delTime(arr.creationTime)
                }
            }).catch(err=>{
                console.log("失败",err)
            })
        },
        //时间处理格式
        delTime(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
        /* 点击上一页 */
        prevClick(data){
             this.tableDataMethod(data);
             this.currentPage = data
        },
        /* 点击下一页 */
        nextClick(data){
           this.tableDataMethod(data);
            this.currentPage = data
        },
        /* 点击页标 */
        currentChange(data){
             this.tableDataMethod(data);
             this.currentPage = data
        },
        /* 处理class属性 */
        handStaus(status){
            if(status == 1){
                return 'yellow'
            }else if(status == 2 || status == 3 || status == 4){
                return 'lightBlue'
            }else if(status == 5){
                return 'normal'
            }
        },
        /* 提交核警 */
        onSubmitNuclearPolice(id){
            const fd = new FormData();
            this.nuclearpoliceForm.CheckUserId  = +localStorage.getItem('userId');
            this.nuclearpoliceForm.FireAlarmId   = id;
            if(this.nuclearpoliceForm.CheckStatestirg == '误报'){
                this.nuclearpoliceForm.CheckState = 2
            }else if(this.nuclearpoliceForm.CheckStatestirg == '测试'){
                this.nuclearpoliceForm.CheckState = 3
            }else if(this.nuclearpoliceForm.CheckStatestirg == '真实火警'){
                this.nuclearpoliceForm.CheckState = 4
            }
            console.log("this.nuclearpoliceForm",this.nuclearpoliceForm)
            fd.append('CheckUserId',this.nuclearpoliceForm.CheckUserId)
            fd.append('FireAlarmId',this.nuclearpoliceForm.FireAlarmId)
            fd.append('CheckState',this.nuclearpoliceForm.CheckState)
            fd.append('CheckContent',this.nuclearpoliceForm.CheckContent)
            if(this.nuclearpoliceForm.CheckState = 3){
                console.log("this.nuclearpoliceForm.CheckState",this.nuclearpoliceForm.CheckState)
                 fd.append('NotifyList',this.nuclearpoliceForm.NotifyList)
            }
           
            this.$axios.post(this.$api.CheckFireAlarm,fd).then(res=>{
                console.log("处理核警成功",res)
                this.dialogVisible2 = false;
                this.tableDataMethod(1)

            }).catch(err=>{
                console.log("处理核警失败",err)
            })
        },
       
    },
    mounted(){
        this.tableDataMethod(1);
    }
}
</script>

