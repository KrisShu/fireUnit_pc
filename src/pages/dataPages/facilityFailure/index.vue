<style lang="less">
.facilityFailure{
    .border_one{
        border: solid 1px #2495e6;
    }
    .pd{
        padding: 16px 20px;
    }
    .radioBox{
        padding: 0px;
        margin:20px 0px;
    }
    .basedialog{
        width: 100%;
        padding: 20px;
        display: flex;  
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
        .line{
                display: flex;
                color: white;
                font-size: 16px;
                line-height: 2;
                align-items: center;
                &.display_cloum{
                    flex-direction: column;
                    align-items: flex-start;
                }
                .line_title{
                    width: 120px;
                    font-weight: bold;
                }
                .voicebox{
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
        }
        .imgBox{
            .viewer{
                display: flex;
                img:nth-child(2){
                    margin: 0px 10px;
                }
            }
        }
        .el-radio-group{
            margin: 10px 0px;
            .el-radio__label{
                font-size: 16px;
                color: white;
            }
            .is-checked{
                 .el-radio__label{
                    color: #409EFF;
                }
            }
            
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


</style>
<template>
    <div class="facilityFailure">
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
            </el-button>
        </div>
        <div class="radioBox" v-if="screensign == '维保处理中'">
            <el-radio-group @change="radioChange" v-model="radio">
                <el-radio v-model="radio" :label="6" border>处理完成待确认</el-radio>
                <el-radio v-model="radio" :label="5" border>已派单</el-radio>
            </el-radio-group>
           
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
            :specailText="specailText" 
            @pageChange="prev_next"
            @showdetails="showdetails"
        ></baseTable>

        <!-- 弹窗 -->
        <baseDialog  ref="basedialog" :title="title">
            <div  
                class="basedialog"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >                 
                <div class="left bg">
                    <p class="top"></p>
                    <div class="pd">
                        <p class="line">
                            <span class="line_title">发现时间：</span>
                            {{detailsData.creationTime}}
                        </p>
                        <p v-if="detailsData.handleStatus == 4 || detailsData.handleStatus == 5" class="line">
                            <span class="line_title">派单时间：</span>
                            {{detailsData.dispatchTime}}
                        </p>
                        <p class="line">
                            <span class="line_title">问题来源：</span>
                            <span  v-if="detailsData.source  == 0">未指定</span>
                            <span  v-if="detailsData.source  == 1">值班</span>
                            <span  v-if="detailsData.source  == 2">巡查</span>
                            <span  v-if="detailsData.source  == 3">物联终端</span>
                        </p>
                        <p class="line">
                            <span class="line_title">问题提交人：</span>
                            {{detailsData.userName}}（{{detailsData.userPhone}}）
                        </p>
                        <div class="line">
                            <span class="line_title">问题描述：</span>
                            <p @click="playVioce" class="voicebox" v-if="detailsData.problemVoiceUrl">
                                <span>{{detailsData.voiceLength}}"</span>
                                <img src="../../../assets/image/index/voice.png" alt="">
                            </p>
                        </div>
                        <p class="line" v-if="detailsData.problemRemark">
                                {{detailsData.problemRemark}}
                        </p>
                        <div class="imgBox" v-if="detailsData.patrolPhotosPath">
                                <viewer class="viewer"  :images="detailsData.patrolPhotosPath">
                                    <img
                                        v-for="(img,Imgindex) in detailsData.patrolPhotosPath"
                                        :key="Imgindex"
                                        style="width: 100px; height: 100px"
                                        :src="img"
                                        fit="cover"
                                    ><img>
                                </viewer>
                        </div>
                    </div>
                </div>
                <div class="right bg" v-if="detailsData.handleStatus !=3">
                    <p class="top"></p>
                    <div class="pd">
                        <p class="line">
                            <span class="line_title">问题处理：</span>
                        </p>
                        <p class="line" style=" justify-content: space-between">
                            <span >是否已解决</span>
                            <el-switch  active-color="#13ce66" inactive-color="#cfcfcf" v-model="isdel"></el-switch>
                        </p>
                        <p v-if="detailsData.handleStatus == 1" class="line display_cloum">
                            <span class="line_title">问题处理途径：</span>
                            <el-radio-group v-model="radio">
                                <el-radio :label="1">自行处理</el-radio>
                                <el-radio :label="2">维保叫修</el-radio>
                            </el-radio-group>
                        </p>
                        <p class="line" v-if="detailsData.handleStatus == 4" style=" justify-content: space-between">
                            <span >问题处理途径：</span>
                            <span>自行处理</span>
                        </p>
                        <p class="line" v-if="detailsData.handleStatus == 5" style=" justify-content: space-between">
                            <span >问题处理途径：</span>
                            <span>维保叫修（处理中）</span>
                        </p>

                       
                        <p class="line"><span class="line_title">备注：</span></p>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="detailsData.solutionRemark"
                        >
                        </el-input>
                        <el-button @click="submit(detailsData)" v-if="isdel || detailsData.handleStatus == 4 || detailsData.handleStatus == 5">提交</el-button>
                        <el-button @click="submit(detailsData)" v-if="!isdel && detailsData.handleStatus == 1">派单</el-button>
                    </div>

                </div>
                <!--  -->
                <div class="right bg" v-else>             
                    <p class="top"></p>
                    <div class="pd">
                        <p class="line">
                            <span class="line_title">解决时间：</span>
                            {{detailsData.solutionTime}}
                        </p>
                        <p class="line">
                            <span class="line_title">处理途径：</span>
                            {{detailsData.solutionWay}}
                        </p>
                        <p class="line">
                            <span class="line_title">备注说明：</span>
                        </p>
                        <p class="line">
                             {{detailsData.solutionRemark}}
                        </p>
                    </div>
                </div>
                
            </div>
        </baseDialog>

    </div>
</template>
<script>


import baseTable from '../../../components/baseTable/index'
import baseDialog from '../../../components/baseDialog'
export default {
    components:{
        baseTable,
        baseDialog
    },
    data(){
        return{
            loading:false,
            screensign:'待处理',
            radio:6 ,
            buttonarr:[
                {
                    type:'info',
                    text:'待处理'
                },
                {
                    type:'primary',
                    text:'自行处理中',
                    num:0
                },
                {
                    type:'warning',
                    text:'维保处理中',
                    num:0
                },
                {
                    type:'success',
                    text:'已解决',
                    num:0
                },
            ],
            tableThead:[],
            tableThead1:[
                {
                    name:'发现时间',
                    prop:'creationTime',
                   
                },
                {
                        name:'问题来源',
                        prop:'source',
                },
                {
                        name:'问题提交人',
                        prop:'userName', 
                },
                {
                        name:'操作',
                }
            ],
            tableThead2:[
               {
                   name:'发现时间',
                   prop:'creationTime',
                   width:'280'
               },
               {
                   name:'派单时间',
                   prop:'dispatchTime',
                   width:'200'
               },
               {
                        name:'问题来源',
                        prop:'source',
                },
                {
                        name:'问题提交人',
                        prop:'userName', 
                },
                {
                        name:'操作',
                }
            ],
            tableThead3_1:[
               {
                   name:'发现时间',
                   prop:'creationTime',
                   width:'280'
               },
               {
                   name:'处理完成时间',
                   prop:'safeCompleteTime',
                   width:'200'
               },
               {
                        name:'问题来源',
                        prop:'source',
                },
                {
                        name:'问题提交人',
                        prop:'userName', 
                },
                {
                        name:'操作',
                }
            ],
            tableThead4:[
               {
                   name:'发现时间',
                   prop:'creationTime',
                   width:'280'
               },
               {
                   name:'解决时间',
                   prop:'solutionTime',
                   width:'200'
               },
               {
                        name:'问题来源',
                        prop:'source',
                },
                {
                        name:'问题提交人',
                        prop:'userName', 
                },
                {
                        name:'操作',
                }
            ],
            title: "设施故障待处理",
            tableData: [],
            totalCount:0,//
            specailText:'查看',
            amr:Object,//语音播放对象
            page:{
                FireUnitId:localStorage.getItem('fireUnitID'),
                HandleStatus :1,
                SkipCount:0,
                MaxResultCount:10
            },
            detailsData:[],//详情数据
            isdel:false,
            radio:1,
            textarea:''




        }
    },
    created(){
        this.tableDataMethod();
        this.tableThead = this.tableThead1
    },
    methods:{
        screen(state){
            this.screensign = state
            if(state == '待处理'){
                this.tableThead = this.tableThead1
                this.page.HandleStatus = 1
            }else if(state == '自行处理中'){
                 this.tableThead = this.tableThead2
                 this.page.HandleStatus = 4
            }else if(state == '维保处理中'){
                this.tableThead = this.tableThead3_1
                this.radio =6;
                this.page.HandleStatus = 6

                
            }else if(state == '已解决'){
                this.tableThead = this.tableThead4
                this.page.HandleStatus = 3
            }
            this.page.SkipCount =0;
            this.tableDataMethod();
        },
        radioChange(data){
           this.page.HandleStatus = data;
            this.page.SkipCount =0;
            this.tableDataMethod();
        },
        //   数据请求
        tableDataMethod(){
            this.loading = true
            this.$axios.get(this.$api.GetBreakDownlist,{params:this.page}).then(res=>{
                this.loading = false
                console.log("列表数据",res)
               
                    for(let arr of res.data.result.items){//处理时间
                        arr.creationTime = this.deal( arr.creationTime)
                        arr.dispatchTime = this.deal( arr.dispatchTime)
                        arr.solutionTime = this.deal( arr.solutionTime)
                        arr.safeCompleteTime = this.deal( arr.safeCompleteTime)
                    };
                    ({totalCount:this.totalCount,items:this.tableData}=res.data.result);
                
            })
        },
        deal(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
       
         //上下页
        prev_next(page){
            console.log("page",page)
            this.page.SkipCount = (page-1)*this.page.MaxResultCount
            this.tableDataMethod();
        },
        //查看详情
        showdetails(item){
            console.log("查看详情",item)
            this.loading = true;
            let breakDownId = item.breakDownId
            // , "自行处理",'维保叫修', "设置故障已解决"]
            if(item.handleStatus == 1){
                this.title = "设施故障待处理"
            }else if(item.handleStatus == 4){
                this.title = "自行处理"
            }else if(item.handleStatus == 3){
                this.title = "设置故障已解决"
            }

            this.$refs.basedialog.dialogVisible = true;

            this.$axios.get(this.$api.GetBreakDownInfo,{params:{breakDownId}}).then(res=>{
                console.log("获取设施故障详情",res)
                if(res.data.result.patrolPhotosPath){
                    for(let x=0;x< res.data.result.patrolPhotosPath.length;x++){
                     res.data.result.patrolPhotosPath[x] = `${this.$URL}${res.data.result.patrolPhotosPath[x]}`
                    }
                }

                if(res.data.result.problemVoiceUrl){
                    res.data.result.problemVoiceUrl = `${this.$URL}${res.data.result.problemVoiceUrl}`;
                    let BenzAMRRecorder = require('benz-amr-recorder');
                    this.amr = new BenzAMRRecorder();
                    this.amr.initWithUrl(res.data.result.problemVoiceUrl);
                }
                res.data.result.dispatchTime = this.deal(res.data.result.dispatchTime)
                res.data.result.creationTime = this.deal(res.data.result.creationTime)
                res.data.result.solutionTime = this.deal(res.data.result.solutionTime)
                this.detailsData = res.data.result;
                this.loading = false;
            }).catch(err=>{
                console.log("err",err)
            })
        },
        // 点击播放语音
        playVioce(){
            this.amr.play();
            this.amr.onEnded(function() {
               console.log("播放完毕")
            })
        },
        //提交
        submit(data){
            console.log("data",data)
            let d ={}
            d.breakDownId =data.id;
            if(data.handleStatus == 1){
                if(this.isdel && (this.radio == 1|| this.radio == 2)){//已解决
                    d.handleStatus = 3
                }else if(!this.isdel && this.radio == 1){//自行处理中
                    d.handleStatus = 4
                }else if(!this.isdel && this.radio == 2){//维保叫修（已派单）
                    d.handleStatus = 5
                }
            }else if(data.handleStatus == 4){
                if(this.isdel){
                    d.handleStatus = 3
                }else{
                     d.handleStatus = 4
                }
            }else if(data.handleStatus == 5){
                 if(this.isdel){
                    d.handleStatus = 3
                }else{
                     d.handleStatus = 5
                }
            }
            d.solutionWay = this.radio;
            d.solutionRemark = data.solutionRemark

            console.log("dddddddddd",d)

            this.$axios.put(this.$api.UpdateBreakDownInfo,d).then(res=>{
                console.log("提交成功",res)
                this.$refs.basedialog.dialogVisible = false;
                this.tableDataMethod();
            })

        },













        
        
      
      
       
        // showdetails(data){
        //     console.log("详情处理",data)
        //     this.detailsMethod(data.breakDownId);
        // },
        /* 侧边数据请求 */
        detailsMethod(breakDownId){
            console.log("breakDownId",breakDownId)
            let that = this;
            that.detailsData_BreakDownId = breakDownId
            this.$axios({
                method:'get',
                url:that.$api.GetBreakDownInfo,
                params:{
                    breakDownId 
                }

            }).then(res=>{
                console.log("详情请求",res)
               that.detailsData_creationTime   = res.data.result.creationTime
               that.detailsData_userName  = res.data.result.userName
               that.detailsData_phone  = res.data.result.userPhone
              
                if(res.data.result.problemRemark){
                    that.detailsData_problemRemakeType = 1
                    that.detailsData_remakeText  = res.data.result.problemRemark
                }else if(res.data.result.problemVoiceUrl){

                    that.detailsData_problemRemakeType = 2
                    this.Duration = res.data.result.voiceLength
                }else{
                    that.detailsData_problemRemakeType = 0
                }
                if(res.data.result.problemRemakeType == 2){
                        let vioceUrlPath =  `${this.$URL}${res.data.result.problemVoiceUrl}`
                        console.log(vioceUrlPath)
                         
                        let BenzAMRRecorder = require('benz-amr-recorder');
                        this.amr = new BenzAMRRecorder();
                        this.amr.initWithUrl(vioceUrlPath).then(()=> {});
                    
                }
             
               that.detailsData_remark  = res.data.result.solutionRemark
               if(res.data.result.patrolPhotosPath){
                    for(let imgarr of  res.data.result.patrolPhotosPath){
                        imgarr = `${this.$URL}${imgarr}`
                    }
                    that.detailsData_patrolPhotosPath = res.data.result.patrolPhotosPath
               }
               
               that.detailsData_solutionTime = res.data.result.solutionTime
               if(res.data.result.handleStatus == 2) {
                    that.form.status ='未解决'
               }else if(res.data.result.handleStatus == 3){
                   that.form.status ='已解决'
               }else if(res.data.result.handleStatus == 1){
                    that.form.status ='未解决'
               }
                if(res.data.result.solutionWay == 1){
                     that.form.way = "自行处理"
                }else if(res.data.result.solutionWay == 2){
                    that.form.way = "维保叫修"
                }else if(res.data.result.solutionWay == 0){
                    that.form.way = "自行处理"
                }
               that.form.desc = res.data.result.solutionRemark
              
            }).catch(res=>{
                console.log("详情请求失败",res)
            })
        }

    }
}
</script>

