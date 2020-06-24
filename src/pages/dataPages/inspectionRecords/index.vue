<style lang="less">
.inspectionRecords{
    @divBG : #072041;
    .border_dialog{
        -webkit-border-image: url("../../../assets/image/border.png") 27 round;
        border-image:url("../../../assets/image/home/home_img_bg.png") 22 24 repeat stretch;
        border-style: solid;
        border-width: 24px 24px;
    }
    .el-dialog{
        width: 30%;
        height: 90%;
        min-width: 500px;
        min-height: 800px;
        .border_dialog();
        position: relative;
        background: @divBG;
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
                min-height: 400px;
        }
        .dialogContent{
            p{
                line-height: 3;
                color: white;
                span{
                    &.title{
                        font-weight: bold;
                        display: inline-block;
                        width: 100px;
                        text-align: left;
                    }
                }
                &.summary{
                    color: #a2ecff;
                }
            }
            
        }
    }

        .right_details_TrackList{
                height: 480px;
                padding: 20px 0px;
                width:100%;
              
                .el-scrollbar__wrap{
                    overflow-x: hidden;
                }
                .right_details_TrackList_inner{
                    .cricle_container{
                         display: flex;
                         /*  */
                        .right_box_box{
                            width: 390px;
                            padding: 16px;
                            border: solid 1px #4360a4;
                            margin-bottom: 10px;
                             font-size: 12px;
                             color: white;
                             p{
                                 line-height: 2;
                             }
                            .right_box_box_time{
                                display: flex;
                                justify-content: space-between;
                                .status{
                                    font-size: 14px;
                                    &.normal{
                                       color: #1eff00;
                                    }
                                    &.had{
                                       color: #1eff00;
                                    }
                                    &.hading{
                                       color: orange;
                                    }
                                }
                            }
                            .VoiceRemark{
                                margin-top: 20px;
                                .remark{
                                    font-size: 16px;
                                }
                                .audio{
                                    width: 80px;
                                    height: 30px;
                                    background: #54b954;
                                    border-radius: 10px;
                                    display: flex;
                                    align-items: center;
                                    color: white;
                                    padding: 0px 6px;
                                    cursor: pointer;
                                    .voice{
                                        margin-right: 10px;
                                    }
                                }
                            }
                            .right_box_box_Img{
                                display: flex;
                                margin-top: 12px;
                                img{
                                    width: 100px;
                                    height: 100px;
                                    &:nth-of-type(2){
                                        margin: 0px 40px;
                                    }
                                }
                            }
                        }
                        /*  */
                        .left_cricle_box{
                             display: flex;
                             flex-direction: column;
                             justify-content: center;
                             align-items: center;
                             position: relative;
                             width: 40px;
                             .cricle{
                                 width: 14px;
                                 height: 14px;
                                 border-radius: 50%;
                                 background-color: #00baff;
                             }
                             .line{
                                 width: 1px;
                                 height: 190px;
                                 background-color: #00baff;
                                 position: absolute;
                                 top: 102px;
                             }

                        }
                    }

                    &:last-of-type .line{
                        height: 0px !important;
                    }

                }

        }
}
   

</style>
<template>
    <div class="inspectionRecords">
        <div class="topStatus">
            <el-button
                v-for="item in buttonarr"
                :key="item.text"
                round 
                plain
                :type="item.type"
                @click="screen(item.text)"
            >
                <i v-if="screensign == item.text" class="el-icon-check  el-icon--right"></i>
                {{item.text}}
                {{item.num}}
            </el-button>
        </div>
        <baseTable
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :tableThead="tableThead"
            :tableData="tableData"
            :totalCount='totalCount'
            :pageSize="10"
            specailText="查看巡查记录"
            @showdetails="showdetails"
            @pageChange="prev_next"
        >
        
        </baseTable>

        <!-- 巡查记录弹窗 -->
        <el-dialog top="4vh" title="巡查记录" :visible.sync="dialogVisible">
            <div class="dialogContent">
                <p><span class="title">提交时间：</span>{{PatrolInfo.creationTime}}</p>
                <p><span class="title">值班人员：</span>{{PatrolInfo.userName}}</p>
                <p>
                    <span class="title">巡查方式：</span>
                    <span v-if="PatrolInfo.patrolType == 1">一般巡查</span>
                    <span v-if="PatrolInfo.patrolType == 2">扫码巡查</span>
                </p>
               
                <p class="summary">有效轨迹点{{PatrolInfo.totalDetailNum}}个，发现{{PatrolInfo.totalProblemNum}}个问题，现场解决{{PatrolInfo.greenProblemNum}}个问题</p>
                 <div 
                    class="right_details_TrackList" 
                    v-if=" PatrolInfo.patrolDetailList"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                     <el-scrollbar style="height:100%">
                        <div class="right_details_TrackList_inner" v-for="(arr,index) in  PatrolInfo.patrolDetailList" :key="index">
                            <div class="cricle_container">
                                <div class="left_cricle_box">
                                </div>
                                <div class="right_box_box">
                                    <p class="right_box_box_time">
                                        <span>{{arr.creationTime}}</span>
                                        <span class="status" v-if="arr.patrolStatus == 0">未指定</span>
                                        <span class="status normal" v-if="arr.patrolStatus == 1">正常</span>
                                        <span class="status had" v-if="arr.patrolStatus == 2">已解决</span>
                                        <span class="status hading" v-if="arr.patrolStatus == 3">异常</span>
                                    </p>
                                    <div class="right_box_box_patrolAddress">
                                        <span>{{arr.patrolAddress}}</span>
                                    </div>
                                    <div class="VoiceRemark">
                                        <p class="remark" v-if="arr.problemRemark">{{arr.problemRemark}}</p>
                                        <div v-if="arr.problemVoiceUrl" class="audio" @click="playaudio(index)">
                                            <img class="voice" src="../../../assets/image/index/voice.png" alt="">
                                            <span class="time">{{arr.voiceLength}}"</span>
                                        </div>
                                    </div>
                                    <div class="right_box_box_Img">
                                        <viewer :images="arr.patrolPhtosPath">
                                            <img v-for="(img,imgIndex) in arr.patrolPhtosPath"  :key="imgIndex" :src="img" alt="">
                                        </viewer>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </el-scrollbar>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import baseTable from '../../../components/baseTable/index'
export default {
   components:{
       baseTable
   },
    data(){
        return{
            loading:false,
            screensign:'全部',
            buttonarr:[
                {
                    type:'info',
                    text:'全部'
                },
                {
                    type:'success',
                    text:'正常',
                    num:0
                },
                {
                    type:'success',
                    text:'故障-已解决',
                    num:0
                },
                {
                    type:'warning',
                    text:'故障-未解决',
                    num:0
                }
            ],
            totalCount:0,//列表总数
            tableData:[],//
            tableThead:[
                {
                    name:'提交时间',
                    prop:'creationTime'
                },
                {
                    name:'巡查人员',
                    prop:'userName'
                },
                {
                    name:'状态',
                    prop:'state'
                },
                {
                    name:'操作'
                }
            ],
            page:{
                FireUnitId :localStorage.getItem('fireUnitID'),
                PatrolStatus:0,
                SkipCount:0,
                MaxResultCount:10
            },
            dialogVisible:false,
            PatrolInfo:[],//详情数据
            amr:Object,//语音播放对象
        }
    },
    created(){
        this.GetPatrolList();
        this.GetPatrolStatusTotal();
    },
    methods:{
        //筛选数据
        screen(state){
            this.screensign = state;
            if(state == '全部'){
                this.page.PatrolStatus = 0
            }else if(state == '正常'){
                this.page.PatrolStatus = 1
            }else if(state == '故障-已解决'){
                this.page.PatrolStatus = 2
            }else if(state == '故障-未解决'){
                this.page.PatrolStatus = 3
            }
            
            this.page.SkipCount =0;
            this.GetPatrolList();
        },

        //获取巡查记录状态统计
        GetPatrolStatusTotal(){
            let fireunitId =localStorage.getItem('fireUnitID')
            this.$axios.get(this.$api.GetPatrolStatusTotal,{params:{fireunitId}}).then(res=>{
                this.buttonarr[1].num = res.data.result.normalCount
                this.buttonarr[2].num = res.data.result.greenFaultCount
                this.buttonarr[3].num = res.data.result.redFaultCount
            }).catch(err=>{
                console.log("err",err)
            })
        },
       
        //获取巡查列表
        GetPatrolList(){
            this.loading = true;
            this.$axios.get(this.$api.GetPatrolList,{params:this.page}).then(res=>{
                console.log("获取巡查列表成功",res);
                this.loading = false;
                if(res.data.result.totalCount>0){
                    for(let arr of res.data.result.items){
                        arr.creationTime = this.deal( arr.creationTime);
                        if( arr.patrolStatus == 1 ){
                            arr.state = '正常'
                        }else if( arr.patrolStatus == 2 ){
                            arr.state = '故障-已解决'
                        }else if( arr.patrolStatus == 3 ){
                            arr.state = '故障-未解决'
                        }
                       
                    }
                    ({totalCount:this.totalCount,items:this.tableData}=res.data.result);
                }
            }).catch(err=>{
                console.log("获取巡查列表失败",err)
            })
        },
        //处理时间
        deal(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
        //上下页
        prev_next(page){
            this.page.SkipCount = (page-1)*this.page.MaxResultCount
            this.GetPatrolList();
        },
        //打开弹窗
        showdetails(item){
            this.dialogVisible = true;
            this.GetPatrolInfo(item.patrolId)
        },
        //初始化样式
        initBG(){
            if(this.PatrolInfo.patrolDetailList.length>0){
                var  element =  document.getElementsByClassName('left_cricle_box');
                console.log("element",element)
                var last = element.length-1
                element[last].style.height = 0+"px";
                var box = document.getElementsByClassName('right_box_box')
                var last_box = box.length-1;
                var one_height = box[0].clientHeight+12+'px'
                var postionheight =parseInt(one_height) /2 +'px'
                var last_height = box[last_box].clientHeight+12+'px'
                var postionheight_last =parseInt(last_height) /2 +'px'

                if(this.PatrolInfo.patrolDetailList.length == 1){
                    console.log("只有一条数据",)
                }else{
                    for( var i = 0;i<element.length;i++){
                            element[i].style.height = 'auto'
                            element[i].style.background  = "url('../../../static/two_bg.png')"
                            element[i].style.backgroundPosition = 'center'
                            element[i].style.backgroundRepeat = 'no-repeat'
                    }
                    // element[0].style.height = one_height
                    element[0].style.background  = "url('../../../static/one_bg.png')"
                    element[0].style.backgroundPosition = `center ${postionheight}`
                    element[0].style.backgroundRepeat = 'no-repeat'
                    element[last].style.height = postionheight_last
                    element[last].style.background  = "url('../../../static/three.png')"
                    element[last].style.backgroundRepeat = 'no-repeat'
                    element[last].style.backgroundPosition = `center bottom`
                }
            }
          
        },
        //获取巡查记录详情
        GetPatrolInfo(patrolId){
            this.loading = true;
            this.$axios.get(this.$api.GetPatrolInfo,{params:{patrolId}}).then(res=>{
                console.log("获取巡查记录详情",res)
                res.data.result.creationTime = this.deal(res.data.result.creationTime)
                this.PatrolInfo = res.data.result;
                if( res.data.result.patrolDetailList.length>0){
                    for(let arr of res.data.result.patrolDetailList){
                        arr.creationTime = this.deal( arr.creationTime)
                        for(let x=0;x<arr.patrolPhtosPath.length;x++){
                            arr.patrolPhtosPath[x] = `${this.$URL}${ arr.patrolPhtosPath[x]}`
                        }
                        if(arr.problemVoiceUrl){
                            arr.problemVoiceUrl =  `${this.$URL}${arr.problemVoiceUrl}`;
                            let BenzAMRRecorder = require('benz-amr-recorder');
                            this.amr = new BenzAMRRecorder();
                            this.amr.initWithUrl( arr.problemVoiceUrl);
                        }
                
                    }
                        this.$nextTick(()=>{
                            this.initBG();
                            this.loading = false;
                        })
                        
                }
            }).catch(err=>{
                console.log("获取巡查记录详情失败",err)
            })
        },
        //播放语音
        playaudio(){
            this.amr.play();
            this.amr.onEnded(function() {
               console.log("播放完毕")
            })
        }
    }
}
</script>

