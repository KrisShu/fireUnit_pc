<style lang="less">
.dutyRecord{
    .dutyDetailsDialog{
        width: 100%;
        p{
            line-height: 3;
            color: white;
            span{
                display: inline-block;
                &.title{
                    width: 200px;
                    text-align: right;
                    font-weight: bold;
                }
                
            }
        }
        .imgBox{

            .viewer{
                display: flex;
                img{
                    margin-right: 50px;
                }
            }
        }
        .vioceUrl{
            margin: 20px 0px;
            width: 80px;
            height: 30px;
            border-radius: 10px;
            background: rgb(84, 185, 84);
            display: flex;
            align-items: center;
            color: white;
            padding-left: 10px;
            cursor: pointer;
        }
        .display{
            display: flex;
            align-items: center;
        }
    }
}
</style>
<template>
    <div class="dutyRecord">
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
            specailText="查看值班记录"
            @showdetails="showdetails"
            @pageChange="prev_next"
        ></baseTable>


        <!-- 弹窗 -->

        <baseDialog ref="dutyDetailsDialog" title="值班记录详情">
            <div 
                class="dutyDetailsDialog"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <p>
                    <span class="title">提交时间：</span>
                    {{dutyInfoData.creationTime}}
                </p>
                <p>
                    <span class="title">值班人员：</span>
                    {{dutyInfoData.dutyUserName}}
                </p>
                <p>
                    <span class="title">发现问题：</span>
                    <span v-if="dutyInfoData.status  == 1" class="content">
                        未发现问题状态正常
                    </span>
                    <span v-if="dutyInfoData.status  == 2" class="content">
                        发现问题（已现场解决）
                    </span>
                    <span v-if="dutyInfoData.status  == 3" class="content">
                       发现问题（未解决）
                    </span>

                </p>
                <div class="display">
                    <p>
                        <span class="title">值班记录：</span>
                    </p>

                    <div class="imgBox">
                        <viewer class="viewer" v-if="dutyInfoData.dutyPhtosPath"  :images="dutyInfoData.dutyPhtosPath">
                            <img
                                v-for="(img,Imgindex) in dutyInfoData.dutyPhtosPath"
                                :key="Imgindex"
                                style="width: 100px; height: 100px"
                                :src="img"
                                fit="cover"
                            ><img>
                        
                        </viewer>
                        <p v-else>暂无值班记录</p>
                    </div>
                   
                </div>
                <!--  -->
                <div class="display">
                    <p>
                        <span class="title">情况描述：</span>
                    </p>
                    <p  v-if="dutyInfoData.problemRemark">
                        {{dutyInfoData.problemRemark}}
                    </p>
                    <div class="vioceUrl"  @click="playVioce" v-if="dutyInfoData.problemVoiceUrl">
                        <img src="../../../assets/image/index/voice.png" alt="">
                        <span>{{dutyInfoData.voiceLength}}"</span>
                    </div>
               
                </div>
                <div class="display">
                    <p>
                        <span class="title">现场问题图片：</span>
                    </p>
                    <div class="imgBox">
                        <viewer class="viewer" v-if="dutyInfoData.problemPhtosPath"  :images="dutyInfoData.problemPhtosPath">
                            <img
                                v-for="(img,Imgindex) in dutyInfoData.problemPhtosPath"
                                :key="Imgindex"
                                style="width: 100px; height: 100px"
                                :src="img"
                                fit="cover"
                            ><img>
                        
                        </viewer>
                        <p v-else>暂无现场照片</p>
                    </div>
                </div>
            </div>
        </baseDialog>
    </div>
</template>
<script>
let FireUnitId = localStorage.getItem('fireUnitID')
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
            screensign:'全部',
            totalState:[],//总的状态
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
                    prop:'creationTime',
                },
                {
                    name:'值班人员',
                    prop:'dutyUserName',
                },
                {
                    name:'状态',
                    prop:'state',
                },
                {
                    name:'操作'
                }
            ],
            page:{
                FireUnitId :localStorage.getItem('fireUnitID'),
                DutyStatus:0,
                SkipCount:0,
                MaxResultCount:10
            },
            dutyInfoData:[],//详情数据
            amr:Object,//语音播放对象


            nowMoth_duty:0,//当前月份
            arr:[],//标记数据
         
        }
    },
    created(){
        this.GetDutylist();
        this.GetDutyStateTotal();
    },
     mounted(){

    },
    methods:{
        //筛选
        screen(state){
            this.screensign = state
            if(state == '全部'){
                this.page.DutyStatus = 0
            }else if(state == '正常'){
                this.page.DutyStatus = 1
            }else if(state == '故障-已解决'){
                this.page.DutyStatus = 2
            }else if(state == '故障-未解决'){
                this.page.DutyStatus = 3
            }
            
            this.page.SkipCount =0
            this.GetDutylist();
       
        },
        //获取值班记录状态统计
        GetDutyStateTotal(){
            let fireUnitId = localStorage.getItem('fireUnitID');
            this.$axios.get(this.$api.GetDutyStateTotal,{params:{fireUnitId}}).then(res=>{
                console.log("res",res)
                this.totalState = res.data.result;
                this.buttonarr[1].num = res.data.result.normalCount
                this.buttonarr[2].num = res.data.result.greenFaultCount
                this.buttonarr[3].num = res.data.result.redFaultCount
            }).catch(err=>{
                console.log("err",err)
            })
        },
        //获取值班记录列表
        GetDutylist(){
            this.loading = true;
            this.$axios.get(this.$api.GetDutylist,{params:this.page}).then(res=>{
                console.log("打印值班记录列表",res);
                this.loading = false;
                if(res.data.result.totalCount>0){
                    for(let arr of res.data.result.items){
                        arr.creationTime = this.deal( arr.creationTime);
                        if( arr.dutyStatus == 1 ){
                            arr.state = '正常'
                        }else if( arr.dutyStatus == 2 ){
                            arr.state = '故障-已解决'
                        }else if( arr.dutyStatus == 3 ){
                            arr.state = '故障-未解决'
                        }
                       
                    }
                    ({totalCount:this.totalCount,items:this.tableData}=res.data.result);
                }
            }).catch(err=>{
                console.log("打印值班记录列表成功",err)
            })
        },
        //处理时间
        deal(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
        //打开值班记录详情的弹窗
        showdetails(item){
            this.$refs.dutyDetailsDialog.dialogVisible = true;
            this.GetDutyInfo(item.dutyId)
        },
        //获取值班记录详情
        GetDutyInfo(dutyId){
            this.loading = true;
            this.$axios.get(this.$api.GetDutyInfo,{params:{dutyId}}).then(res=>{
                //值班记录照片
                if(res.data.result.dutyPhtosPath){
                    for(let x=0;x< res.data.result.dutyPhtosPath.length;x++){
                     res.data.result.dutyPhtosPath[x] = `${this.$URL}${res.data.result.dutyPhtosPath[x]}`
                    }
                }
                if(res.data.result.dutyPhotosBase64){
                    for(let i = 0;i<res.data.result.dutyPhotosBase64.length;i++){
                        res.data.result.dutyPhotosBase64[i] = `data:image/jpeg;base64,${res.data.result.dutyPhotosBase64[i]}`
                    }
                }
                //情况描述
                if(res.data.result.problemVoiceUrl){
                    res.data.result.problemVoiceUrl =  `${this.$URL}${res.data.result.problemVoiceUrl}`;
                    let BenzAMRRecorder = require('benz-amr-recorder');
                    this.amr = new BenzAMRRecorder();
                    this.amr.initWithUrl( res.data.result.problemVoiceUrl);
                }
                
                //现场图片
                if(res.data.result.problemPhtosPath){
                    for(let y=0;y< res.data.result.problemPhtosPath.length;y++){
                     res.data.result.problemPhtosPath[y] = `${this.$URL}${res.data.result.problemPhtosPath[y]}`
                    }
                }
                res.data.result.creationTime = this.deal(res.data.result.creationTime)

                this.dutyInfoData = res.data.result
                console.log("获取值班记录详情",res)
                this.loading = false;
            }).catch(err=>{
                console.log("获取值班记录详情失败",err)
            })
        },

        //点击播放语音
        playVioce(){
            this.amr.play();
            this.amr.onEnded(function() {
               console.log("播放完毕")
            })
        },
        //table上下页
        prev_next(page){
            this.page.SkipCount = (page-1)*this.page.MaxResultCount
            this.GetDutylist();
        }
    }
}
</script>

