<style lang="less">
.facilityFailure{
    .border_one{
        border: solid 1px #2495e6;
    }
    .pd{
        padding: 16px 20px;
    }
    .topStatus{

    }
    .bottomContent{
        margin-top: 50px;
        height: 100%;
        .content{
            width: 100%;
            // border: white 1px solid;
            &.right-content{
                height: 660px;
                background-color: #10315b;
                border-radius: 5px;
            }
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
        <div class="bottomContent">
            <el-row>
                <el-col :span="14">
                    <div class="left-content content">
                        <baseTable
                            :tableThead="tableThead"
                            :tableData="tableData"
                            :totalCount='totalCount'
                            :pageSize="9"
                            :specailText="specailText" 
                        ></baseTable>
                    </div>
                </el-col>
                <el-col :span="8" :offset="2">
                    <div class="right-content content">
                        
                    </div>
                </el-col>
            </el-row>
        </div>  

    </div>
</template>
<script>

let FireUnitId = localStorage.getItem('fireUnitID')
import baseTable from '../../../components/baseTable/index'
export default {
    components:{
        baseTable
    },
    data(){
        return{
            screensign:'待处理',
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
            activeName:'toBeProcessed' ,
            tableThead:[],
            tableThead_1:[
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
                   name:'处理时间',
                   prop:'solutionTime',
                   width:'200'
               },
               
               {
                    name:'问题来源',
                    prop:'userName',
                    width:'412',
                    prop2:'phone'
               },
               {
                    name:'操作',
                    width:'206'
               }
            ],
            tableData: [],
            specailText:'处理',
            form:{
               status:'',
               way:'',
               desc:''
            },
            dataPage:1,
            handleStatus:1,
            totalCount:0,//总共条数
            SkipCount:0,
            MaxResultCount:9,
            detailsData_creationTime:'',
            detailsData_userName:'',
            detailsData_phone:'',
            detailsData_problemRemakeType:'',
            amr:'',//语音对象
            Duration:'',//语音时长
            detailsData_remakeText:'',
            detailsData_patrolPhotosPath:[],
            detailsData_BreakDownId:0,
            detailsData_remark:'',
            detailsData_handleStatus:'',
            detailsData_solutionWay:'',
            detailsData_solutionTime:'',//问题解决时间

        }
    },
    methods:{
        screen(state){
            this.screensign = state
            if(state == '待处理'){
                this.tableThead = this.tableThead_1
            }
        },
        handleClick(){
            console.log("tabActive",this.activeName)
            if(this.activeName !=='toBeProcessed'){
                this.specailText = '详情'
            }else{
                 this.specailText = '处理'
            }
            if(this.activeName == 'processing'){
                this.tableDataMethod(2,1)
                this.handleStatus = 2
            }else if(this.activeName == 'processed'){
                this.tableDataMethod(3,1)
                this.handleStatus = 3
            }else if(this.activeName == 'toBeProcessed'){
                this.tableDataMethod(1,1)
                this.handleStatus = 1
            }
            
        },
        /* 点击播放语音 */
        playVioce(){
            this.amr.play();
            this.amr.onEnded(function() {
               console.log("播放完毕")
            })
        },
        /* 处理数据提交 */
        onSubmit(){
            if((this.form.status =='未解决' || this.form.status =='已解决')&& (this.form.way == '自行处理' || this.form.way == '维保叫修')){
                let that = this;
                let breakDownId =this.detailsData_BreakDownId
                let handleStatus 
                if(this.form.status == '未解决') {
                    handleStatus = 2
                }else if(this.form.status == '已解决'){
                    handleStatus = 3
                }
                let solutionWay 
                if(this.form.way == '自行处理'){
                    solutionWay = 1
                }else if(this.form.way == '维保叫修'){
                    solutionWay = 2
                } 
                let remark = this.form.desc
                this.$axios({
                    method:'put',
                    url:that.$api.UpdateBreakDownInfo,
                    data:{
                        breakDownId,
                        handleStatus,
                        solutionWay,
                        remark
                    }
                }).then(res=>{
                    console.log("更新设施故障详情",res)
                    that.$message({
                        message: '处理设施故障成功',
                        type: 'success'
                    })
                    that.tableDataMethod(that.handleStatus,that.dataPage)
                }).catch(res=>{
                    console.log("更新设施故障详情失败",res)
                })
            }else{
                this.$message({
                    message: '警告!请选择故障状态或处理途径',
                    type: 'warning'
                });
            }
        },
        /* 数据请求 */
        tableDataMethod(HandleStatus,dataPage){
            let that = this; 
            this.$axios({
                method:'get',
                url:that.$api.GetBreakDownlist,
                params:{
                   FireUnitId,
                   Source:0,
                   HandleStatus,
                   SkipCount:(dataPage-1)*that.MaxResultCount,
                   MaxResultCount:that.MaxResultCount
                }
            }).then(res=>{
                console.log("设施故障数据请求成功",res)
                for(let arr of res.data.result.items){//处理时间
                    arr.creationTime = this.deal( arr.creationTime)
                }
                that.totalCount = res.data.result.totalCount
                that.tableData = res.data.result.items

                if(res.data.result.items.length>0){
                     that.detailsMethod(res.data.result.items[0].breakDownId)
                }
               
                
            }).catch(res=>{
                  console.log("设施故障数据请求失败",res)
            })

        },
        deal(data){
            var str = data.split('T');
            var str2 = str[1].split(".")
            var timestr = str[0] +" "+ str2[0]
            return timestr;
        },
        /* 上一页 */
        prevClick(dataPage){
            console.log("页数",dataPage)
            this.dataPage = dataPage
            this.tableDataMethod(this.handleStatus,dataPage)
        },
        /* 下一页 */
        nextClick(dataPage){
             console.log("页数",dataPage)
            this.dataPage = dataPage
            this.tableDataMethod(this.handleStatus,dataPage)
        },
        currentChange(dataPage){
            this.dataPage = dataPage
            this.tableDataMethod(this.handleStatus,dataPage)
        },
        showdetails(data){
            console.log("详情处理",data)
            this.detailsMethod(data.breakDownId);
        },
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

    },
    mounted(){
        this.tableDataMethod(1,1);
        this.tableThead = this.tableThead_1
    }
}
</script>

