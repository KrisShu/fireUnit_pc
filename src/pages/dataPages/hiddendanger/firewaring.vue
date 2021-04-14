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
        width: 800px;
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
                height: 450px;
                width:100%;
                justify-content: center;
                align-items: center;
                    .el-form{
                        width: 50%;
                        height: 80% !important;
                        padding: 20px;
                        height: inherit;
                        border: 1px solid darkblue;
                        box-shadow: 0 2px 12px 0 #29d;
                        .el-form-item{
                            .el-form-item__label{
                                font-size: 16px;
                                color: white;
                            }
                            .el-form-item__content{
                                .el-radio-group{
                                    .el-radio__label{
                                    color: white;
                                    }
                                }
                                .el-textarea__inner{
                                    background: #025691;
                                    color: white;
                                    resize: none;
                                }
                            }
                        }
                        .truePolice{
                            margin-bottom: 10px;
                            margin-left: 102px;
                        }
                        .el-button{
                            width: 100%;
                            background: #025691;
                            color: #cccccc;
                        }
                    }
                    .detailsBox{
                        width: 70%;
                        padding: 40px 20px;
                        border: 1px solid darkblue;
                        box-shadow: 0 2px 12px 0 #29d;
                        color: white;
                        font-size: 16px;
                        height: fit-content;
                        p{
                            line-height: 2;
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

                    }         
        }
        &.fireMap{
            height: 80%;
            .el-dialog__header{
                height: 0px;
            }
            .el-dialog__body{
                height: 100%;
                 #fireBit{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    .noData{
                        color: white;
                        font-size: 20px;
                        text-align: center;
                    }
                    #markerLayer{
                        position: relative;
                        img{
                            width: 20px;
                            height: 20px;
                        }
                        .ss{
                            background: rgb(255, 255, 255);
                            padding: 10px;
                            border-radius: 6px;

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
            <el-button
                v-for="item in buttonarr"
                :key="item.text"
                round 
                plain
                :type="item.type"
                @click="screen(item.text)"
            >
                <i v-if="screensign == item.text" class="el-icon-check  el-icon--right"></i>
                {{item.text}} {{item.num}}
            </el-button>
        </div>
        <div class="tableBox">
            <el-table :data="tableData"  style="width: 100%">
                <el-table-column label="时间">
                     <template slot-scope="scope">
                        <span>{{ scope.row.creationTime }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="火警网关"> -->
                <el-table-column label="部件编号">
                     <template slot-scope="scope">
                        <span>{{ scope.row.detectorSn}}</span>
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
                            <span v-if="scope.row.checkState == 5">核警 </span>
                         </el-button>
                         <el-button  
                         :class="handStaus(scope.row.checkState)"  
                         v-if="scope.row.existBitMap"
                         @click="getpoint(scope.row.fireAlarmId)"
                         >
                             点位图
                         </el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagenationBox">
            <el-pagination  prev-text="上一页" next-text="下一页" hide-on-single-page  @current-change="pageChange" background layout="total,prev, pager, next" :total="totalCount"></el-pagination>
        </div>

        <!-- 弹窗-核警 -->
        <el-dialog  title="消防警情核警" :visible.sync="dialogVisible">
                <el-form v-if="checkState == 1 || checkState == 5" class="nuclearpoliceForm" ref="form" :model="nuclearpoliceForm" label-width="100px">
                    <el-form-item label="情况处理：">
                        <el-radio-group v-model="nuclearpoliceForm.CheckStatestirg ">
                            <el-radio label="误报">误报</el-radio>
                            <el-radio label="测试">测试</el-radio>
                            <el-radio label="真实火警">真实火警</el-radio>
                        </el-radio-group>
                     </el-form-item>
                    <div class="truePolice" v-if="nuclearpoliceForm.CheckStatestirg == '真实火警'">
                        <el-checkbox-group v-model="nuclearpoliceForm.NotifyList">
                            <el-checkbox label="通知工作人员"></el-checkbox>
                            <el-checkbox label="通知119"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-form-item label="情况描述：">
                        <el-input type="textarea" rows="10"  placeholder="情况简要描述，200字以内" v-model="nuclearpoliceForm.CheckContent"></el-input>
                    </el-form-item>
                    <el-button @click="onSubmitNuclearPolice">提交</el-button>
                </el-form>
                <div class="detailsBox" v-else>
                        <p>处理时间：<span>{{dealData.checkTime}}</span> </p>
                        <p>处理状态：
                            <span v-if="dealData.checkState == 2">误报</span>
                            <span v-if="dealData.checkState == 3">测试</span>
                            <span v-if="dealData.checkState == 4">真实火警</span>
                        </p>
                        <div>
                            <p class="handleContent" v-if="dealData.content">情况描述：<span>{{dealData.content}}</span></p>
                            <div class="display_p" v-if="dealData.handleVoiceUrl">
                                <span> 情况描述：</span>
                                <div class="vioceUrl"  @click="playVioce(dealData.handleVoiceLength)">
                                <img src="../../../assets/image/index/voice.png" alt="">
                                <span>{{dealData.vioceUrl}}"</span>
                            </div>
                            </div>
                        </div>
                </div>
                
            
        </el-dialog>

        <!-- 火警点位弹窗 -->
         <el-dialog width="80%"  custom-class="fireMap" title="火警点位图" :visible.sync="dialogVisible3">
            <div id="fireBit" ref="fireBit">
            </div>
            
        </el-dialog>


    </div>
</template>
<script>
import { error } from 'util'
import AILabel  from 'ailabel'
/* import BenzAMRRecorder  from 'benz-amr-recorder' */
export default {
    data(){
        return{
            fireUnitId:localStorage.getItem('fireUnitID'),
            buttonarr:[
                {
                    type:'primary',
                    text:'全部'
                },
                {
                    type:'warning',
                    text:'未核警',
                    num:''
                },
                {
                    type:'success',
                    text:'已核警',
                    num:''
                },
            ],
            screensign:'全部',
            /* 核警form */
            nuclearpoliceForm:{
               CheckStatestirg:'误报',
               NotifyList: ['通知工作人员']
            },
            tableData: [],
            dialogVisible:false,
            dialogVisible3:false,
            MaxResultCount:10,
            SkipCount:0,
            totalCount:0,//数据总共条数
            dealData:[],//待处理数据
            amr:'',//amr播放对象
            CheckId:0,//核警id   
            currentPage:1,//当前页
            fireBit:"",//火警点位内容
            fireimg:require('../../../assets/image/home/fire.gif'),
            gMap:'',
            gFeatureLayer:'',



            checkState:'',
            CheckStaus:'',
            AlarmDataId:''
        }
    },
    mounted(){
        this.tableDataMethod(1);
        this.GetFireAlarmCheckStatusNum();
    },
    methods:{
        //筛选数据
        screen(text){
           this.screensign = text;
            if(text == '全部'){
                this.tableDataMethod(1,1)
            }else if(text == '未核警'){
                this.tableDataMethod(1,3);
                this.CheckStaus = 3
            }else{
                this.tableDataMethod(1,2)
                this.CheckStaus = 2
            }
        },
        //获取各项状态数据数量
        GetFireAlarmCheckStatusNum(){
            this.$axios.get(this.$api.GetFireAlarmCheckStatusNum,{
                params:{fireUnitId:this.fireUnitId}
            }).then(res=>{
                // console.log("获取各项状态数据数量",res);
                this.buttonarr[1].num = res.data.result[0].value
                this.buttonarr[2].num = res.data.result[1].value
            })
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
             this.dialogVisible = true;
             this.checkState = status
            if(status ==5 || status == 1){
                this.AlarmDataId = id
            }else{
                this.GetFireAlarmById(id)
            }
            
        },
        init(cx,cy){
            this.gMap = new AILabel.Map('fireBit',
                {
                    zoom: 1500, 
                    cx: 0, 
                    cy: 0, 
                    zoomMax: 650 * 10, 
                    zoomMin: 650 / 10, 
                    autoPan: true, 
                    drawZoom: true
                }
            );
            // 图片层实例\添加
            const gImageLayer = new AILabel.Layer.Image('img',  this.fireBit.floorPicture, 
                {
                    w: 1080, 
                    h: 720
                }, 
                {
                    zIndex: 1
                }
            );
            this.gMap.addLayer(gImageLayer);
            // 矢量层实例\添加
            this.gFeatureLayer = new AILabel.Layer.Feature('featureLayer', 
            {
                zIndex: 2, 
                transparent: true
            }
            );
            this.gMap.addLayer(this.gFeatureLayer);
        },

        //获取点位
        getpoint(fireAlarmId){
            this.dialogVisible3 = true;
            this.$axios.get(this.$api.GetDetectorBitMap,{
                params:{fireAlarmId}
            }).then(res=>{
                console.log("火警点位图",res)
                if(res.data.result.floorPicture){
                    res.data.result.creationTime=this.delTime(res.data.result.creationTime)
                    this.fireBit = res.data.result;
                    this.init(res.data.result.coordinateX,res.data.result.coordinateY)
                    this.createMarker(this.fireBit)
                }
              
            }).catch(err=>{
                console.log("err",err)
            })

        },
        createMarker(content) {
        //    fireimg
            let  marker = new AILabel.Marker(content.id, {
                src:this.fireimg,
                x: content.coordinateX,
                y: content.coordinateY,
                offset: {x: -10, y: -10},
            });
            this.gMap.mLayer.addMarker(marker);
            let imga =  $("#markerLayer").find('img')
            imga.on({
                mouseenter: function (e) {
                    let p =$(`<div class='ss'>
                    <p>【时间】：${content.creationTime}</p>
                    <p>【部件】：${content.detectorSn}</p>
                    <p>【类型】：${content.detectorTypeName}</p>
                    <p>【位置】：${content.location}</p>
                    </div>`);
                    p.css({"position":"absolute"})
                    imga.after(p)
                },
                mouseleave: function (e) {
                    $('.ss').remove()
                }
            })
               
           
        },
        //获取数据详情
        GetFireAlarmById(fireAlarmId){
            this.$axios.get(this.$api.GetFireAlarmById,{params:{fireAlarmId}}).then(res=>{
                console.log("获取某一条火警数据详情",res)
                if(res.data.result.vioceUrl){
                    res.data.result.vioceUrl = `${this.$URL}${ res.data.result.vioceUrl}`;
                    let BenzAMRRecorder = require('benz-amr-recorder');
                    this.amr = new BenzAMRRecorder();
                    this.amr.initWithUrl(res.data.result.vioceUrl);
                }
                this.dealData = res.data.result
                this.dealData.creationTime = this.delTime(this.dealData.creationTime)
                
            }).catch(err=>{
                console.log("err",err)
            })
        },
        //获取火警联网数据列表
        tableDataMethod(dataPage,CheckStates=1){//缺少分页的字段和筛选的字段
            let FireUnitId = localStorage.getItem('fireUnitID');
                this.$axios.get(this.$api.GetFireAlarmList,
                {params:{FireUnitId, 
                        MaxResultCount:this.MaxResultCount, 
                        SkipCount:(dataPage-1)*this.MaxResultCount,
                        VisitSource:1,
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
        /* 点击页标 */
        pageChange(data){
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
                return 'yellow'
            }
        },
        /* 提交核警 */
        onSubmitNuclearPolice(){
            const fd = new FormData();
            this.nuclearpoliceForm.CheckUserId  = +localStorage.getItem('userId');
            if(this.nuclearpoliceForm.CheckStatestirg == '误报'){
                this.nuclearpoliceForm.CheckState = 2
            }else if(this.nuclearpoliceForm.CheckStatestirg == '测试'){
                this.nuclearpoliceForm.CheckState = 3
            }else if(this.nuclearpoliceForm.CheckStatestirg == '真实火警'){
                this.nuclearpoliceForm.CheckState = 4
            }
            console.log("this.nuclearpoliceForm",this.nuclearpoliceForm)
            fd.append('CheckUserId',this.nuclearpoliceForm.CheckUserId)
            fd.append('AlarmDataId',this.AlarmDataId)
            fd.append('CheckState',this.nuclearpoliceForm.CheckState)
            fd.append('CheckContent',this.nuclearpoliceForm.CheckContent)
            if(this.nuclearpoliceForm.CheckState = 4){
                 fd.append('NotifyList',this.nuclearpoliceForm.NotifyList)
            }
            this.$axios.post(this.$api.CheckFireAlarm,fd).then(res=>{
                console.log("处理核警成功",res)
                this.dialogVisible = false;
                this.nuclearpoliceForm.CheckStatestirg = '误报'
                this.nuclearpoliceForm.CheckContent = ''
                this.tableDataMethod(1,this.CheckStaus);
                this.GetFireAlarmCheckStatusNum();

            }).catch(err=>{
                console.log("处理核警失败",err)
            })
        },
       
    },
}
</script>

